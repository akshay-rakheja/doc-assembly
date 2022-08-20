import "./core";
import {
  httpSuccess,
  makeAPIGatewayLambda,
  makeLambda,
  sendHttpResult,
} from "@raydeck/serverless-lambda-builder";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Handler,
} from "aws-lambda";
import { Agent } from "https";
import { QldbDriver, RetryConfig } from "amazon-qldb-driver-nodejs";
import { getAssetPath } from "@raydeck/local-assets";
import { BigNumber, ContractFactory, ethers } from "ethers";
import { exec } from "child_process";
import { List, Value } from "ion-js/dist/commonjs/es6/dom";
import { Lambda } from "aws-sdk";
import { get as registryGet } from "@raydeck/registry-manager";
import { copyFileSync, readFileSync, writeFileSync } from "fs";
import {
  TermsableNoToken__factory,
  ERC721Termsable__factory,
} from "./contracts/index";
import { promisify } from "util";
import { render } from "mustache";
import fetch from "node-fetch";
import { KeyPair } from "ucan-storage-commonjs/keypair";
import { build, validate } from "ucan-storage-commonjs/ucan-storage";
const DEFAULT_RENDERER =
  "bafybeig44fabnqp66umyilergxl6bzwno3ntill3yo2gtzzmyhochbchhy";
const DEFAULT_TEMPLATE =
  "bafybeiavljiisrizkro3ob5rhdludulsiqwkjp43lanlekth33sqhikfry/template.md";
//#region QLDB intialization
const maxConcurrentTransactions = 10;
const retryLimit = 4;
//Reuse connections with keepAlive
const agentForQldb: Agent = new Agent({
  keepAlive: true,
  maxSockets: maxConcurrentTransactions,
});
const serviceConfigurationOptions = {
  region: process.env.region || process.env.AWS_REGION,
  httpOptions: {
    agent: agentForQldb,
  },
};
const retryConfig: RetryConfig = new RetryConfig(retryLimit);
const ledgerName = process.env.ledgerName || "myLedger";
const chainInfo: Record<string, { privateKey: string; url: string }> = {
  "80001": {
    privateKey: process.env.METASIGNER_MUMBAI_PRIVATE_KEY || "",
    url: process.env.ALCHEMY_MUMBAI_KEY || "",
  },
  "137": {
    privateKey: process.env.METASIGNER_POLYGON_PRIVATE_KEY || "",
    url: process.env.ALCHEMY_POLYGON_KEY || "",
  },
};
const getChainInfo = (chainId: string) => {
  if (chainId.startsWith("0x")) chainId = parseInt(chainId, 16).toString(10);
  const _chainInfo = chainInfo[chainId];
  if (!_chainInfo) {
    throw new Error(`Chain ${chainId} not found`);
  }
  return _chainInfo;
};

const qldbDriver: QldbDriver = new QldbDriver(
  ledgerName,
  serviceConfigurationOptions,
  maxConcurrentTransactions,
  retryConfig
);
//#endregion
//#region Helper Functions
let madeTables = false;
const makeTables = async () => {
  if (madeTables) return;
  const tableNames = await qldbDriver.getTableNames();
  console.log(tableNames);
  if (!tableNames.includes("Contracts")) {
    //Build transmissions table
    await qldbDriver.executeLambda(async (txn) => {
      await txn.execute(`CREATE TABLE Contracts`);
      await txn.execute(`CREATE INDEX ON Contracts (id)`);
      await txn.execute(`CREATE INDEX ON Contracts (owner)`);
    });
  }
  if (!tableNames.includes("Accounts")) {
    //Build transmissions table
    await qldbDriver.executeLambda(async (txn) => {
      await txn.execute(`CREATE TABLE Accounts`);
      await txn.execute(`CREATE INDEX ON Accounts (id)`);
    });
  }
  if (!tableNames.includes("Templates")) {
    //Build transmissions table
    await qldbDriver.executeLambda(async (txn) => {
      await txn.execute(`CREATE TABLE Templates`);
      await txn.execute(`CREATE INDEX ON Templates (id)`);
      await txn.execute(`CREATE INDEX ON Templates (owner)`);
    });
  }
  if (!tableNames.includes("Users")) {
    //Build transmissions table
    await qldbDriver.executeLambda(async (txn) => {
      await txn.execute(`CREATE TABLE Users`);
      await txn.execute(`CREATE INDEX ON Users (id)`);
    });
  }
  madeTables = true;
};
const getRecord = async (tableName: string, id: string) => {
  await makeTables();
  const result = await qldbDriver.executeLambda(async (txn) => {
    const result = await txn.execute(
      `SELECT * FROM ${tableName} WHERE id = '${id}'`
    );
    return result;
  });
  return result.getResultList().pop();
};
const getUser = async (address: string) =>
  getRecord("Users", address.toLowerCase());
const getContract = async (id: string) =>
  getRecord("Contracts", id.toLowerCase());
const getAccount = async (id: string) => getRecord("Accounts", id);
const getAccountsForUser = async (address: string) => {
  const user = await getUser(address);
  if (user) {
    const accounts = user.get("accounts") as List;
    console.log("accounts as list", accounts);
    console.log("length of accounts", accounts.length);
    console.log("first account", accounts.get(0));
    const accountArr: Value[] = [];
    for (let i = 0; i < accounts.length; i++) {
      const a = accounts.get(i);
      if (a) {
        console.log("account", a);
        accountArr.push(a);
      }
    }
    const output = accountArr.map((v) => v.stringValue()).filter(Boolean);
    console.log("Outputs");
    if (output && output.length) return output as string[];
  }
  return [];
};
const getSignerFromHeader = <T extends { exp: number }>(
  event: APIGatewayProxyEvent
) => {
  //check for the header
  //check the header for my signature
  const authorization = event.headers.Authorization;
  if (authorization) {
    const [, key] = authorization.split(" ");
    const json = Buffer.from(key, "base64").toString("utf8");
    const { signature, message }: { signature: string; message: string } =
      JSON.parse(json);
    const address = ethers.utils.verifyMessage(message, signature);
    const parsedMessage: T = JSON.parse(message);
    if (parsedMessage.exp) {
      //compare with now
      const exp = parsedMessage.exp;
      const now = Date.now();
      if (exp < now) {
        return undefined;
      }
    }
    return { address, message: parsedMessage };
  }
  return undefined;
};
const makeAuthenticatedFunc = (
  func: (args: {
    event: APIGatewayProxyEvent;
    context: any;
    callback: Callback<APIGatewayProxyResult>;
    user: Value;
    accounts: Record<string, Value>;
  }) => void
) => <Handler<APIGatewayProxyEvent, APIGatewayProxyResult>>(async (
    event,
    context,
    callback
  ) => {
    const payload = getSignerFromHeader(event);
    if (!payload) {
      return sendHttpResult(401, "Unauthorized");
    }
    let user = await getUser(payload.address);
    if (!user) {
      await qldbDriver.executeLambda(async (txn) => {
        await txn.execute("INSERT INTO Users ?", {
          id: payload.address.toLowerCase(),
          accounts: [payload.address.toLowerCase()],
        });
        await txn.execute("INSERT INTO Accounts ?", {
          id: payload.address.toLowerCase(),
        });
      });
      user = await getUser(payload.address);
      if (!user) {
        return sendHttpResult(500, "Error creating user");
      }
    }
    const accountIds = await getAccountsForUser(payload.address);
    console.log("accountIds", accountIds);
    const accountList = (
      await Promise.all(accountIds.map(async (id) => await getAccount(id)))
    ).filter(Boolean);
    console.log("accountList", accountList);
    const accounts = accountList.reduce(
      (acc, account) => ({
        ...acc,
        [account?.get("id")?.stringValue() || ""]: account,
      }),
      {}
    );
    console.log("accounts", accounts);
    if (!Object.keys(accounts).length) {
      return sendHttpResult(401, "No Authorized accounts");
    }
    return func({
      event,
      context,
      callback,
      user,
      accounts: accounts as Record<string, Value>,
    });
  });
//#endregion
//#region Unsecured API Endpoints
export const signDocument = makeAPIGatewayLambda({
  path: "/sign",
  method: "post",
  cors: true,
  timeout: 30,
  func: async (event, context, callback) => {
    if (!event.body) return sendHttpResult(400, "No body provided");
    const {
      address,
      signature,
      message,
    }: { address: string; signature: string; message: string } = JSON.parse(
      event.body
    );
    if (!ethers.utils.verifyMessage(message, signature)) {
      return sendHttpResult(400, "Invalid signature");
    }
    const polydocsURI = message.substring(
      message.indexOf(": "),
      message.length
    );
    const fragment = polydocsURI.substring(polydocsURI.indexOf("#") + 1);
    const [, chainId, contractAddress, blockNumber] = fragment.split("::");
    //check the chainID
    const { url, privateKey } = getChainInfo(chainId);
    const provider = new ethers.providers.StaticJsonRpcProvider(url);
    const signer = new ethers.Wallet(privateKey, provider);
    const polydocs = TermsableNoToken__factory.connect(contractAddress, signer);
    try {
      await polydocs.acceptTermsFor(address, message, signature);
      return httpSuccess("signed");
    } catch (e) {
      return sendHttpResult(
        500,
        "Could not sign document on contract " + contractAddress
      );
    }
  },
});
// export const registerUser = makeAPIGatewayLambda({
//   path: "/register",
//   method: "post",
//   cors: true,
//   timeout: 30,
//   func: async (event, context, callback) => {
//     if (!event.body) return sendHttpResult(400, "No body provided");
//     const {
//       address,
//       signature,
//       message,
//     }: { address: string; signature: string; message: string } = JSON.parse(
//       event.body
//     );
//     await qldbDriver.executeLambda(async (txn) => {
//       await txn.execute(
//         "INSERT INTO Users (id, accounts) VALUES ($1, $2)",
//         address,
//         [address]
//       );
//       await txn.execute("INSERT INTO Accounts (id) VALUES ($1)", address);
//     });
//     return httpSuccess("registered");
//   },
// });
//#endregion
//#region Secured API Endpoints
type DeployEvent = {
  address: string;
  name: string;
  symbol: string;
  renderer: string;
  template: string;
  // terms: Record<string, string>;
  // title: string;
  // description: string;
  // image?: string;
  // cover?: string;
  royaltyRecipient: string;
  royaltyPercentage: string;
  chainId: string;
  uri: string;
};
export const deployNFTContract = makeAPIGatewayLambda({
  path: "/make-nft-contract",
  method: "post",
  cors: true,
  timeout: 30,
  func: makeAuthenticatedFunc(
    async ({ event, context, callback, user, accounts }) => {
      if (!event.body) return sendHttpResult(400, "No body provided");
      const {
        address,
        name,
        symbol,
        chainId,
        renderer,
        template,
        uri,
        royaltyRecipient,
        royaltyPercentage,
      }: DeployEvent = JSON.parse(event.body);
      //Validate the address
      if (!address || ethers.utils.isAddress(address) === false)
        return sendHttpResult(400, "Invalid address");
      const account = accounts[address.toLowerCase()];
      if (!account) return sendHttpResult(401, "Unauthorized");
      if (!name) return sendHttpResult(400, "Invalid name");
      if (!symbol) return sendHttpResult(400, "Invalid symbol");
      const chainInfo = getChainInfo(chainId);
      if (!chainInfo) return sendHttpResult(400, "Invalid chainId");

      const provider = new ethers.providers.StaticJsonRpcProvider(
        chainInfo.url
      );
      const signer = new ethers.Wallet(chainInfo.privateKey, provider);
      //time to deploy
      // build the new contract
      //copy everything into tmp/contracts

      const polyDocsFactory = new ERC721Termsable__factory(signer);
      const hundredgwei = ethers.utils.parseUnits("50", "gwei");
      console.log("A hundred gwei is", hundredgwei.toString());
      console.log("Deploying with", address, name, symbol);
      const polyDocs = await polyDocsFactory.deploy(address, name, symbol, {
        maxFeePerGas: hundredgwei,
        maxPriorityFeePerGas: hundredgwei,
        gasLimit: BigNumber.from(6_500_000),
      });
      console.log("polyDocs is ", polyDocs.address);
      qldbDriver.executeLambda(async (tx) => {
        await tx.execute("INSERT INTO Contracts ?", {
          id: `${chainId}::${polyDocs.address}`,
          name,
          symbol,
          owner: account.get("id")?.stringValue(),
        });
        return true;
      });
      const Payload = JSON.stringify({
        address,
        name,
        symbol,
        contractAddress: polyDocs.address,
        chainId,
      });
      console.log(
        "invoking makecontract",
        registryGet("MAKE_CONTRACT_FUNCTION")
      );
      await new Lambda({ region: registryGet("AWS_REGION", "us-east-1") })
        .invoke({
          InvocationType: "Event",
          FunctionName: registryGet("stackName") + "-doDeploy",
          Payload,
        })
        .promise();

      return httpSuccess({
        message: "I got this party started",
      });
    }
  ),
});
export const doDeploy = makeLambda({
  timeout: 300,
  func: async (event) => {
    console.log("my event is ", event);
    const {
      royaltyRecipient,
      royaltyPercentage,
      renderer = DEFAULT_RENDERER,
      template = DEFAULT_TEMPLATE,
      // terms = {},
      uri,
      chainId,
      contractAddress,
    }: DeployEvent & { contractAddress: string } = event;
    const chainInfo = getChainInfo(chainId);
    const provider = new ethers.providers.StaticJsonRpcProvider(chainInfo.url);
    const signer = new ethers.Wallet(chainInfo.privateKey, provider);
    const polyDocs = ERC721Termsable__factory.connect(contractAddress, signer);
    await polyDocs.deployed();
    const pdPromise = polyDocs.setPolydocs(renderer, template, []);
    const mdPromise = polyDocs.setURI(uri);
    //@TODO support royalty
    const [pdTxn, mdTxn] = await Promise.all([pdPromise, mdPromise]);
    await Promise.all([pdTxn.wait(), mdTxn.wait()]);
    console.log("I have a deployed polydocs with Metadata");
  },
});

export const hhDeploy = makeLambda({
  timeout: 300,
  func: async (event) => {
    console.log("my event is ", event);
    const {
      address,
      name,
      symbol,
      renderer = DEFAULT_RENDERER,
      template = DEFAULT_TEMPLATE,
      terms = {},
    }: {
      address: string;
      name: string;
      symbol: string;
      renderer: string;
      template: string;
      terms: Record<string, string>;
    } = event;
    console.log("hello!!!");
    if (!process.env.METASIGNER_MUMBAI_PRIVATE_KEY)
      return sendHttpResult(500, "Environment keys not properly set up");
    if (!process.env.ALCHEMY_MUMBAI_KEY)
      return sendHttpResult(500, "Environment keys not properly set up");
    const provider = new ethers.providers.StaticJsonRpcProvider(
      process.env.ALCHEMY_MUMBAI_KEY
      // "0x" + (80001).toString(16)
    );
    // const provider = ethers.getDefaultProvider(80001);
    console.log("provider key", process.env.ALCHEMY_MUMBAI_KEY);
    // console.log("provider", provider);
    const signer = new ethers.Wallet(
      process.env.METASIGNER_MUMBAI_PRIVATE_KEY,
      provider
    );
    //time to deploy
    // build the new contract
    //copy everything into tmp/contracts

    const templateContract = readFileSync(
      getAssetPath() + "/contracts/tokens/MyContract.sol",
      "utf8"
    );
    await promisify(exec)(
      "cp -r " + getAssetPath() + "/contracts/ /tmp/sources/"
    );
    await promisify(exec)(
      "cp -r " + getAssetPath() + "/node_modules/ /tmp/node_modules/"
    );

    const renderedContract = render(templateContract, {
      newowner: address.replace('"', '\\"'),
      name: name.replace('"', '\\"'),
      symbol: symbol.replace('"', '\\"'),
    });

    writeFileSync("/tmp/sources/tokens/MyContract.sol", renderedContract);
    console.log("wrote contract");
    console.log(readFileSync("/tmp/sources/tokens/MyContract.sol", "utf8"));
    console.log("compiling contract");
    copyFileSync(
      getAssetPath() + "/hardhat.config.js",
      "/tmp/hardhat.config.js"
    );
    const hardhatPrefix =
      "cd /tmp && /opt/nodejs/node_modules/hardhat/internal/cli/cli.js";
    const cmd = hardhatPrefix + " compile";
    console.log("cmd is ", cmd);
    console.log(await promisify(exec)(cmd));
    console.log("Getting the json");
    console.log(await promisify(exec)("ls -lR /tmp"));

    const json = readFileSync(
      "/tmp/artifacts/MyContract.sol/MyContract.json",
      "utf8"
    );
    console.log("json is ", json);
    const { abi, bytecode } = JSON.parse(json);
    console.log("abi is ", abi);
    const polyDocsFactory = new ContractFactory(abi, bytecode, signer);
    // const polyDocsFactory = new ERC721Termsable__factory(signer);
    const hundredgwei = ethers.utils.parseUnits("50", "gwei");
    console.log("A hundred gwei is", hundredgwei.toString());
    console.log("Deploying with", address, name, symbol);
    const polyDocs = await polyDocsFactory.deploy(address, name, symbol, {
      maxFeePerGas: hundredgwei,
      maxPriorityFeePerGas: hundredgwei,
      gasLimit: BigNumber.from(6_500_000),
    });
    console.log("polyDocs is ", polyDocs.address);
    await polyDocs.deployed();
    const pdtxn = await polyDocs.setPolydocs(
      renderer,
      template,
      Object.entries(terms).map(([key, value]) => ({
        key,
        value,
      }))
    );
    await pdtxn.wait();
    console.log("I have a deployed polydocs");
  },
});
export const testHH = makeLambda({
  timeout: 300,
  func: async (event) => {
    console.log("my event is ", event);
    if (event) console.log(await promisify(exec)(event));
    // const path = require.resolve("hardhat");
    // console.log("path is ", path);
    // console.log("current path is", __dirname);
    // console.log(await promisify(exec)("pwd"));
    // const output = await promisify(exec)("ls -l opt/node_modules");
    // console.log("output is ", output);
  },
});

export const mintNFT = makeLambda({
  timeout: 300,
  // method: "post",
  // path: "/mintNFT",
  // cors: true,
  func: async (event) => {
    console.log("hello!!!");
    if (!process.env.METASIGNER_MUMBAI_PRIVATE_KEY) return;
    if (!process.env.ALCHEMY_MUMBAI_KEY) return;
    const provider = new ethers.providers.StaticJsonRpcProvider(
      process.env.ALCHEMY_MUMBAI_KEY
      // "0x" + (80001).toString(16)
    );
    // const provider = ethers.getDefaultProvider(80001);
    console.log("provider key", process.env.ALCHEMY_MUMBAI_KEY);
    // console.log("provider", provider);
    const signer = new ethers.Wallet(
      process.env.METASIGNER_MUMBAI_PRIVATE_KEY,
      provider
    );
    //Get the image
    const { address, name, text, cid } = event;
    console.log("Hooray I did not run upload and got a cid", cid);
    console.log("connecting to contract at ", address);
    const contract = ERC721Termsable__factory.connect(address, signer);
    console.log("Connected to contract at address", address);
    const hundredgwei = ethers.utils.parseUnits("50", "gwei");
    console.log("A hundred gwei is", hundredgwei.toString());

    const tx = await contract.mint(cid, {
      maxFeePerGas: hundredgwei,
      maxPriorityFeePerGas: hundredgwei,
      gasLimit: BigNumber.from(500_000),
    });
    console.log("Minted good as gold");
    await tx.wait();
    console.log("Done!!!!!");
    return httpSuccess("hooray!!!");
  },
});

//#endregion
let rootToken = "";
const nsServiceKey = "did:key:z6MknjRbVGkfWK1x5gyJZb6D4LjMj1EsitFzcSccS3sAaviQ";
const issuerKeyPair = new KeyPair(
  Buffer.from(process.env.DID_PRIVATE_KEY ?? "", "base64"),
  Buffer.from(process.env.DID_PUBLIC_KEY ?? "", "base64")
);
export const getUCANToken = makeAPIGatewayLambda({
  timeout: 30,
  method: "get",
  cors: true,
  path: "/ucan-token",
  func: makeAuthenticatedFunc(async () => {
    if (!rootToken.length) {
      const url = "https://api.nft.storage/ucan/token";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NFTSTORAGE_API_KEY}`,
        },
      });
      const retJSON = await response.json();
      rootToken = retJSON.value;
    }
    //#endregion
    const { payload } = await validate(rootToken);
    const { att } = payload;
    const capabilities = att.map((capability) => ({
      ...capability,
      with: [capability.with, nsServiceKey].join("/"),
    }));
    const proofs = [rootToken];
    const token = await build({
      issuer: issuerKeyPair,
      audience: nsServiceKey,
      capabilities: capabilities as any,
      proofs,
      lifetimeInSeconds: 100,
    });
    return httpSuccess({ token, did: process.env.DID });
  }),
});
export const getContracts = makeAPIGatewayLambda({
  timeout: 30,
  method: "get",
  cors: true,
  path: "/contracts",
  func: makeAuthenticatedFunc(async ({ event, user, accounts }) => {
    let { account: accountId } = event.queryStringParameters || {};
    if (!accountId) accountId = accounts[0].get("id")?.stringValue() ?? "";
    if (!accountId) return sendHttpResult(400, "No account id");
    const account = accounts[accountId];
    if (!account) return sendHttpResult(400, "No account found");
    //lets get my contracts
    const list = await qldbDriver.executeLambda(async (txn) => {
      const result = await txn.execute(
        `SELECT * FROM Contract WHERE owner = ?`,
        accountId
      );
      const list = await result.getResultList();
      return list;
    });
    const output = list.map((v) => {
      const id = v.get("id")?.stringValue() ?? "";
      const [chainId, address] = id.split("::");
      const name = v.get("name")?.stringValue() ?? "";
      const description = v.get("description")?.stringValue() ?? "";
      const image = v.get("image")?.stringValue() ?? "";
      return { id, chainId, address, name, description, image };
    });
    return httpSuccess(output);
  }),
});
