/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface TokenTermsableInterface extends utils.Interface {
  functions: {
    "URI()": FunctionFragment;
    "acceptTerms(uint256,string)": FunctionFragment;
    "acceptTermsFor(address,string,uint256,bytes)": FunctionFragment;
    "acceptedTerms(address,uint256)": FunctionFragment;
    "addMetaSigner(address)": FunctionFragment;
    "currentTermsBlock()": FunctionFragment;
    "docTemplate()": FunctionFragment;
    "globalTerm(string)": FunctionFragment;
    "isMetaSigner(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "removeMetaSigner(address)": FunctionFragment;
    "renderer()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setGlobalRenderer(string)": FunctionFragment;
    "setGlobalTemplate(string)": FunctionFragment;
    "setGlobalTerm(string,string)": FunctionFragment;
    "setTokenRenderer(uint256,string)": FunctionFragment;
    "setTokenTemplate(uint256,string)": FunctionFragment;
    "setTokenTerm(string,uint256,string)": FunctionFragment;
    "setURI(string)": FunctionFragment;
    "termsUrl(uint256)": FunctionFragment;
    "termsUrlWithPrefix(uint256,string)": FunctionFragment;
    "tokenRenderer(uint256)": FunctionFragment;
    "tokenTemplate(uint256)": FunctionFragment;
    "tokenTerm(string,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "URI"
      | "acceptTerms"
      | "acceptTermsFor"
      | "acceptedTerms"
      | "addMetaSigner"
      | "currentTermsBlock"
      | "docTemplate"
      | "globalTerm"
      | "isMetaSigner"
      | "owner"
      | "removeMetaSigner"
      | "renderer"
      | "renounceOwnership"
      | "setGlobalRenderer"
      | "setGlobalTemplate"
      | "setGlobalTerm"
      | "setTokenRenderer"
      | "setTokenTemplate"
      | "setTokenTerm"
      | "setURI"
      | "termsUrl"
      | "termsUrlWithPrefix"
      | "tokenRenderer"
      | "tokenTemplate"
      | "tokenTerm"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "URI", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "acceptTerms",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "acceptTermsFor",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "acceptedTerms",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "addMetaSigner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "currentTermsBlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "docTemplate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "globalTerm",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isMetaSigner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeMetaSigner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "renderer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setGlobalRenderer",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setGlobalTemplate",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setGlobalTerm",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenRenderer",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenTemplate",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenTerm",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setURI",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "termsUrl",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "termsUrlWithPrefix",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenRenderer",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenTemplate",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenTerm",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "URI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "acceptTerms",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acceptTermsFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acceptedTerms",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addMetaSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentTermsBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "docTemplate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "globalTerm", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isMetaSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeMetaSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "renderer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGlobalRenderer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGlobalTemplate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGlobalTerm",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTokenRenderer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTokenTemplate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTokenTerm",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setURI", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "termsUrl", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "termsUrlWithPrefix",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenRenderer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenTemplate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenTerm", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "AcceptedTerms(address,uint256,string)": EventFragment;
    "GlobalRendererChanged(string)": EventFragment;
    "GlobalTemplateChanged(string)": EventFragment;
    "GlobalTermChanged(bytes32,bytes32)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "TokenRendererChanged(uint256,string)": EventFragment;
    "TokenTemplateChanged(uint256,string)": EventFragment;
    "TokenTermChanged(bytes32,uint256,bytes32)": EventFragment;
    "UpdatedURI(string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AcceptedTerms"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GlobalRendererChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GlobalTemplateChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GlobalTermChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenRendererChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenTemplateChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenTermChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdatedURI"): EventFragment;
}

export interface AcceptedTermsEventObject {
  sender: string;
  tokenId: BigNumber;
  terms: string;
}
export type AcceptedTermsEvent = TypedEvent<
  [string, BigNumber, string],
  AcceptedTermsEventObject
>;

export type AcceptedTermsEventFilter = TypedEventFilter<AcceptedTermsEvent>;

export interface GlobalRendererChangedEventObject {
  _renderer: string;
}
export type GlobalRendererChangedEvent = TypedEvent<
  [string],
  GlobalRendererChangedEventObject
>;

export type GlobalRendererChangedEventFilter =
  TypedEventFilter<GlobalRendererChangedEvent>;

export interface GlobalTemplateChangedEventObject {
  _template: string;
}
export type GlobalTemplateChangedEvent = TypedEvent<
  [string],
  GlobalTemplateChangedEventObject
>;

export type GlobalTemplateChangedEventFilter =
  TypedEventFilter<GlobalTemplateChangedEvent>;

export interface GlobalTermChangedEventObject {
  _term: string;
  _value: string;
}
export type GlobalTermChangedEvent = TypedEvent<
  [string, string],
  GlobalTermChangedEventObject
>;

export type GlobalTermChangedEventFilter =
  TypedEventFilter<GlobalTermChangedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface TokenRendererChangedEventObject {
  _tokenId: BigNumber;
  _renderer: string;
}
export type TokenRendererChangedEvent = TypedEvent<
  [BigNumber, string],
  TokenRendererChangedEventObject
>;

export type TokenRendererChangedEventFilter =
  TypedEventFilter<TokenRendererChangedEvent>;

export interface TokenTemplateChangedEventObject {
  _tokenId: BigNumber;
  _template: string;
}
export type TokenTemplateChangedEvent = TypedEvent<
  [BigNumber, string],
  TokenTemplateChangedEventObject
>;

export type TokenTemplateChangedEventFilter =
  TypedEventFilter<TokenTemplateChangedEvent>;

export interface TokenTermChangedEventObject {
  _term: string;
  _tokenId: BigNumber;
  _value: string;
}
export type TokenTermChangedEvent = TypedEvent<
  [string, BigNumber, string],
  TokenTermChangedEventObject
>;

export type TokenTermChangedEventFilter =
  TypedEventFilter<TokenTermChangedEvent>;

export interface UpdatedURIEventObject {
  uri: string;
}
export type UpdatedURIEvent = TypedEvent<[string], UpdatedURIEventObject>;

export type UpdatedURIEventFilter = TypedEventFilter<UpdatedURIEvent>;

export interface TokenTermsable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TokenTermsableInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    URI(overrides?: CallOverrides): Promise<[string]>;

    acceptTerms(
      tokenId: PromiseOrValue<BigNumberish>,
      newtermsUrl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    acceptTermsFor(
      _signer: PromiseOrValue<string>,
      _newtermsUrl: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    acceptedTerms(
      to: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    addMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    currentTermsBlock(overrides?: CallOverrides): Promise<[BigNumber]>;

    docTemplate(overrides?: CallOverrides): Promise<[string]>;

    globalTerm(
      _term: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    isMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    removeMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renderer(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setGlobalRenderer(
      _newRenderer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setGlobalTemplate(
      _newDocTemplate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setGlobalTerm(
      _term: PromiseOrValue<string>,
      _value: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setTokenRenderer(
      tokenId: PromiseOrValue<BigNumberish>,
      newRenderer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setTokenTemplate(
      tokenId: PromiseOrValue<BigNumberish>,
      newTokenTemplate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setTokenTerm(
      _term: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _value: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setURI(
      _newURI: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    termsUrl(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    termsUrlWithPrefix(
      tokenId: PromiseOrValue<BigNumberish>,
      prefix: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    tokenRenderer(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    tokenTemplate(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    tokenTerm(
      _term: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  URI(overrides?: CallOverrides): Promise<string>;

  acceptTerms(
    tokenId: PromiseOrValue<BigNumberish>,
    newtermsUrl: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  acceptTermsFor(
    _signer: PromiseOrValue<string>,
    _newtermsUrl: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _signature: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  acceptedTerms(
    to: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  addMetaSigner(
    _signer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  currentTermsBlock(overrides?: CallOverrides): Promise<BigNumber>;

  docTemplate(overrides?: CallOverrides): Promise<string>;

  globalTerm(
    _term: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  isMetaSigner(
    _signer: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  removeMetaSigner(
    _signer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renderer(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setGlobalRenderer(
    _newRenderer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setGlobalTemplate(
    _newDocTemplate: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setGlobalTerm(
    _term: PromiseOrValue<string>,
    _value: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setTokenRenderer(
    tokenId: PromiseOrValue<BigNumberish>,
    newRenderer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setTokenTemplate(
    tokenId: PromiseOrValue<BigNumberish>,
    newTokenTemplate: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setTokenTerm(
    _term: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _value: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setURI(
    _newURI: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  termsUrl(
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  termsUrlWithPrefix(
    tokenId: PromiseOrValue<BigNumberish>,
    prefix: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  tokenRenderer(
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  tokenTemplate(
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  tokenTerm(
    _term: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    URI(overrides?: CallOverrides): Promise<string>;

    acceptTerms(
      tokenId: PromiseOrValue<BigNumberish>,
      newtermsUrl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    acceptTermsFor(
      _signer: PromiseOrValue<string>,
      _newtermsUrl: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    acceptedTerms(
      to: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    addMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    currentTermsBlock(overrides?: CallOverrides): Promise<BigNumber>;

    docTemplate(overrides?: CallOverrides): Promise<string>;

    globalTerm(
      _term: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    isMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    removeMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    renderer(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setGlobalRenderer(
      _newRenderer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setGlobalTemplate(
      _newDocTemplate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setGlobalTerm(
      _term: PromiseOrValue<string>,
      _value: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setTokenRenderer(
      tokenId: PromiseOrValue<BigNumberish>,
      newRenderer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setTokenTemplate(
      tokenId: PromiseOrValue<BigNumberish>,
      newTokenTemplate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setTokenTerm(
      _term: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _value: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setURI(
      _newURI: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    termsUrl(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    termsUrlWithPrefix(
      tokenId: PromiseOrValue<BigNumberish>,
      prefix: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    tokenRenderer(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    tokenTemplate(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    tokenTerm(
      _term: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AcceptedTerms(address,uint256,string)"(
      sender?: null,
      tokenId?: null,
      terms?: null
    ): AcceptedTermsEventFilter;
    AcceptedTerms(
      sender?: null,
      tokenId?: null,
      terms?: null
    ): AcceptedTermsEventFilter;

    "GlobalRendererChanged(string)"(
      _renderer?: PromiseOrValue<string> | null
    ): GlobalRendererChangedEventFilter;
    GlobalRendererChanged(
      _renderer?: PromiseOrValue<string> | null
    ): GlobalRendererChangedEventFilter;

    "GlobalTemplateChanged(string)"(
      _template?: PromiseOrValue<string> | null
    ): GlobalTemplateChangedEventFilter;
    GlobalTemplateChanged(
      _template?: PromiseOrValue<string> | null
    ): GlobalTemplateChangedEventFilter;

    "GlobalTermChanged(bytes32,bytes32)"(
      _term?: PromiseOrValue<BytesLike> | null,
      _value?: null
    ): GlobalTermChangedEventFilter;
    GlobalTermChanged(
      _term?: PromiseOrValue<BytesLike> | null,
      _value?: null
    ): GlobalTermChangedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "TokenRendererChanged(uint256,string)"(
      _tokenId?: PromiseOrValue<BigNumberish> | null,
      _renderer?: PromiseOrValue<string> | null
    ): TokenRendererChangedEventFilter;
    TokenRendererChanged(
      _tokenId?: PromiseOrValue<BigNumberish> | null,
      _renderer?: PromiseOrValue<string> | null
    ): TokenRendererChangedEventFilter;

    "TokenTemplateChanged(uint256,string)"(
      _tokenId?: PromiseOrValue<BigNumberish> | null,
      _template?: PromiseOrValue<string> | null
    ): TokenTemplateChangedEventFilter;
    TokenTemplateChanged(
      _tokenId?: PromiseOrValue<BigNumberish> | null,
      _template?: PromiseOrValue<string> | null
    ): TokenTemplateChangedEventFilter;

    "TokenTermChanged(bytes32,uint256,bytes32)"(
      _term?: PromiseOrValue<BytesLike> | null,
      _tokenId?: PromiseOrValue<BigNumberish> | null,
      _value?: null
    ): TokenTermChangedEventFilter;
    TokenTermChanged(
      _term?: PromiseOrValue<BytesLike> | null,
      _tokenId?: PromiseOrValue<BigNumberish> | null,
      _value?: null
    ): TokenTermChangedEventFilter;

    "UpdatedURI(string)"(uri?: null): UpdatedURIEventFilter;
    UpdatedURI(uri?: null): UpdatedURIEventFilter;
  };

  estimateGas: {
    URI(overrides?: CallOverrides): Promise<BigNumber>;

    acceptTerms(
      tokenId: PromiseOrValue<BigNumberish>,
      newtermsUrl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    acceptTermsFor(
      _signer: PromiseOrValue<string>,
      _newtermsUrl: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    acceptedTerms(
      to: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    addMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    currentTermsBlock(overrides?: CallOverrides): Promise<BigNumber>;

    docTemplate(overrides?: CallOverrides): Promise<BigNumber>;

    globalTerm(
      _term: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    removeMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renderer(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setGlobalRenderer(
      _newRenderer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setGlobalTemplate(
      _newDocTemplate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setGlobalTerm(
      _term: PromiseOrValue<string>,
      _value: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setTokenRenderer(
      tokenId: PromiseOrValue<BigNumberish>,
      newRenderer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setTokenTemplate(
      tokenId: PromiseOrValue<BigNumberish>,
      newTokenTemplate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setTokenTerm(
      _term: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _value: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setURI(
      _newURI: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    termsUrl(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    termsUrlWithPrefix(
      tokenId: PromiseOrValue<BigNumberish>,
      prefix: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenRenderer(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenTemplate(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenTerm(
      _term: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    URI(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    acceptTerms(
      tokenId: PromiseOrValue<BigNumberish>,
      newtermsUrl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    acceptTermsFor(
      _signer: PromiseOrValue<string>,
      _newtermsUrl: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    acceptedTerms(
      to: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    currentTermsBlock(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    docTemplate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    globalTerm(
      _term: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renderer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setGlobalRenderer(
      _newRenderer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setGlobalTemplate(
      _newDocTemplate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setGlobalTerm(
      _term: PromiseOrValue<string>,
      _value: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setTokenRenderer(
      tokenId: PromiseOrValue<BigNumberish>,
      newRenderer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setTokenTemplate(
      tokenId: PromiseOrValue<BigNumberish>,
      newTokenTemplate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setTokenTerm(
      _term: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _value: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setURI(
      _newURI: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    termsUrl(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    termsUrlWithPrefix(
      tokenId: PromiseOrValue<BigNumberish>,
      prefix: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenRenderer(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenTemplate(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenTerm(
      _term: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
