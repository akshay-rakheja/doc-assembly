import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIPFSText } from "./useIPFS";
import { BigNumber, ethers } from "ethers";
import { TokenTermReader__factory, TermReader__factory } from "./contracts";
import Mustache from "mustache";
import Markdown from "react-markdown";
import copy from "clipboard-copy";
import { toast } from "react-toastify";
import { tSExpressionWithTypeArguments } from "@babel/types";
export const ethereum = (window as unknown as { ethereum: any }).ethereum;
export const provider = ethereum
  ? new ethers.providers.Web3Provider(ethereum)
  : undefined;
export const useTerms = (
  address: string,
  block: string,
  token?: ethers.BigNumber
) => {
  const [terms, setTerms] = useState<Record<string, string>>({});
  const termRef = useRef(terms);
  termRef.current = terms;
  const addTerm = useCallback(
    async (key: string) => {
      const [realKey, _defaultValue] = key.split(",");
      if (termRef.current[key]) {
        return;
      }
      const defaultValue = _defaultValue; //?? ``;
      if (defaultValue)
        setTerms((prev) => {
          if (prev[key]) return prev;
          return { ...prev, [key]: defaultValue };
        });
      try {
        if (!provider) return;

        const blockTag = parseInt(block);
        if (typeof token === "undefined") {
          const contract = TermReader__factory.connect(address, provider);
          const term = isNaN(blockTag)
            ? await contract.globalTerm(realKey)
            : await contract.globalTerm(realKey, {
                blockTag,
              });
          if (term) setTerms((prev) => ({ ...prev, [key]: `${term}` }));
        } else {
          const contract = TokenTermReader__factory.connect(address, provider);
          const term = isNaN(blockTag)
            ? await contract.tokenTerm(realKey, token)
            : await contract.tokenTerm(realKey, token, {
                blockTag,
              });
          if (term.startsWith(""))
            if (term) setTerms((prev) => ({ ...prev, [key]: `${term}` }));
        }
      } catch (e) {
        console.error("My life is so hard", e);
      }
    },
    [address, token]
  );

  //http://localhost:3000/
  // #/bafkreiahgnurv72abvrvlvl4s2k62s4kxwxuc56l7eyfwhh3tatnmt4poa::31337::0x5FbDB2315678afecb367f032d93F642f64180aa3::2::0

  // https://ipfs.io/ipfs/bafybeia45ccvqp632ysddhs3bykp3j273pkoxnuaq24r37mh3dl4g3qmvm/#/bafkreiahgnurv72abvrvlvl4s2k62s4kxwxuc56l7eyfwhh3tatnmt4poa::31337::0x5FbDB2315678afecb367f032d93F642f64180aa3::2::0
  const reset = useCallback(() => {
    setTerms({});
  }, []);
  const setTerm = useCallback((term: string, value: string) => {
    setTerms((old) => ({ ...old, [term]: term }));
  }, []);
  return useMemo(
    () => ({ terms, addTerm, reset, setTerm }),
    [terms, addTerm, reset, setTerm]
  );
};
// const { terms, addTerm } = useTerms(
//   contractAddress,
//   block,
//   typeof tokenId === "undefined" ? undefined : BigNumber.from(tokenId)
// );
const defaultAddTerm = (key: string) => {};
const defaultSetTerms = (terms: string[]) => {};
const defaultTerms = {};
const Renderer: FC<{
  template?: string;
  terms?: Record<string, string>;
  addTerm?: (key: string) => void;
  setTerms?: (terms: string[]) => void;
}> = ({
  template = "",
  terms = defaultTerms,
  addTerm = defaultAddTerm,
  setTerms = defaultSetTerms,
}) => {
  useEffect(() => {
    if (template) {
      try {
        const spans = Mustache.parse(template);
        const tokens = spans
          .filter(([type]) => type === "name")
          .map(([, key]) => key);
        const goodTokens = tokens.filter((s) => s.indexOf("{{") === -1);
        goodTokens.forEach(addTerm);
        setTerms(goodTokens);
        console.log("Firing setterms");
      } catch (e) {
        console.error(e);
      }
    }
  }, [template, addTerm, setTerms]);
  if (!template) return <div>"Loading..."</div>;
  if (!provider) return <div>"No provider"</div>;
  let output: string = "";
  try {
    output = Mustache.render(template, terms);
  } catch (e) {
    // return null;
  }
  const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(output));
  return (
    <div className="flex-col flex h-full print:h-full doc-shadow h-full">
      <div className="flex overflow-y-auto print:overflow-visible flex-row justify-center max-h-full">
        <div className="prose bg-white rounded-md  p-4 w-full max-w-200 overflow-y-auto print:overflow-visible">
          <Markdown>{output}</Markdown>
        </div>
      </div>
      <div className=" w-full flex flex-row justify-center print:hidden">
        <button
          className="m-2 rounded-md p-2 border-2 border-purple-800 bg-pink-200 text-gray-800 hover:text-gray-600"
          onClick={() => {
            copy(hash);
            toast("Copied to clipboard");
          }}
        >
          <span className="text-gray-600">Hash:</span> {hash}
        </button>
      </div>
    </div>
  );
};
export default Renderer;
