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

export declare namespace IOrganizationController {
  export type OrganizationStruct = {
    id: PromiseOrValue<BigNumberish>;
    admin: PromiseOrValue<string>;
    nftContract: PromiseOrValue<string>;
    isLocked: PromiseOrValue<boolean>;
  };

  export type OrganizationStructOutput = [
    BigNumber,
    string,
    string,
    boolean
  ] & { id: BigNumber; admin: string; nftContract: string; isLocked: boolean };
}

export interface IOrganizationControllerInterface extends utils.Interface {
  functions: {
    "createOrganization(uint256,address)": FunctionFragment;
    "exists(uint256)": FunctionFragment;
    "getOrganization(uint256)": FunctionFragment;
    "lockOrganization(uint256)": FunctionFragment;
    "totalNFTs(uint256)": FunctionFragment;
    "updateAdmin(uint256,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createOrganization"
      | "exists"
      | "getOrganization"
      | "lockOrganization"
      | "totalNFTs"
      | "updateAdmin"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createOrganization",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "exists",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getOrganization",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "lockOrganization",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalNFTs",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateAdmin",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "createOrganization",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "exists", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getOrganization",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lockOrganization",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "totalNFTs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateAdmin",
    data: BytesLike
  ): Result;

  events: {
    "AdminUpdated(uint256,address,address)": EventFragment;
    "CreateOrganization(uint256,address,address)": EventFragment;
    "OrganizationLocked(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AdminUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreateOrganization"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrganizationLocked"): EventFragment;
}

export interface AdminUpdatedEventObject {
  orgId: BigNumber;
  oldAdmin: string;
  newAdmin: string;
}
export type AdminUpdatedEvent = TypedEvent<
  [BigNumber, string, string],
  AdminUpdatedEventObject
>;

export type AdminUpdatedEventFilter = TypedEventFilter<AdminUpdatedEvent>;

export interface CreateOrganizationEventObject {
  orgId: BigNumber;
  adminAddress: string;
  nftContract: string;
}
export type CreateOrganizationEvent = TypedEvent<
  [BigNumber, string, string],
  CreateOrganizationEventObject
>;

export type CreateOrganizationEventFilter =
  TypedEventFilter<CreateOrganizationEvent>;

export interface OrganizationLockedEventObject {
  orgId: BigNumber;
}
export type OrganizationLockedEvent = TypedEvent<
  [BigNumber],
  OrganizationLockedEventObject
>;

export type OrganizationLockedEventFilter =
  TypedEventFilter<OrganizationLockedEvent>;

export interface IOrganizationController extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IOrganizationControllerInterface;

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
    createOrganization(
      orgId: PromiseOrValue<BigNumberish>,
      admin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    exists(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getOrganization(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[IOrganizationController.OrganizationStructOutput]>;

    lockOrganization(
      id: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    totalNFTs(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    updateAdmin(
      id: PromiseOrValue<BigNumberish>,
      newAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  createOrganization(
    orgId: PromiseOrValue<BigNumberish>,
    admin: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  exists(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getOrganization(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IOrganizationController.OrganizationStructOutput>;

  lockOrganization(
    id: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  totalNFTs(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  updateAdmin(
    id: PromiseOrValue<BigNumberish>,
    newAdmin: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createOrganization(
      orgId: PromiseOrValue<BigNumberish>,
      admin: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    exists(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getOrganization(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IOrganizationController.OrganizationStructOutput>;

    lockOrganization(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    totalNFTs(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateAdmin(
      id: PromiseOrValue<BigNumberish>,
      newAdmin: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AdminUpdated(uint256,address,address)"(
      orgId?: PromiseOrValue<BigNumberish> | null,
      oldAdmin?: PromiseOrValue<string> | null,
      newAdmin?: PromiseOrValue<string> | null
    ): AdminUpdatedEventFilter;
    AdminUpdated(
      orgId?: PromiseOrValue<BigNumberish> | null,
      oldAdmin?: PromiseOrValue<string> | null,
      newAdmin?: PromiseOrValue<string> | null
    ): AdminUpdatedEventFilter;

    "CreateOrganization(uint256,address,address)"(
      orgId?: PromiseOrValue<BigNumberish> | null,
      adminAddress?: PromiseOrValue<string> | null,
      nftContract?: PromiseOrValue<string> | null
    ): CreateOrganizationEventFilter;
    CreateOrganization(
      orgId?: PromiseOrValue<BigNumberish> | null,
      adminAddress?: PromiseOrValue<string> | null,
      nftContract?: PromiseOrValue<string> | null
    ): CreateOrganizationEventFilter;

    "OrganizationLocked(uint256)"(
      orgId?: PromiseOrValue<BigNumberish> | null
    ): OrganizationLockedEventFilter;
    OrganizationLocked(
      orgId?: PromiseOrValue<BigNumberish> | null
    ): OrganizationLockedEventFilter;
  };

  estimateGas: {
    createOrganization(
      orgId: PromiseOrValue<BigNumberish>,
      admin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    exists(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOrganization(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lockOrganization(
      id: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    totalNFTs(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateAdmin(
      id: PromiseOrValue<BigNumberish>,
      newAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createOrganization(
      orgId: PromiseOrValue<BigNumberish>,
      admin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    exists(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOrganization(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lockOrganization(
      id: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    totalNFTs(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateAdmin(
      id: PromiseOrValue<BigNumberish>,
      newAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}