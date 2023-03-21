/**
 * Model Organization
 *
 */
export type Organization = {
  id: number;
  admin: string;
  name: string | null;
  imageCID: string | null;
  nonce: string;
  description: string | null;
  video: string | null;
  email: string | null;
  locked: boolean;
  nftContract: string | null;
  lockedBlockNumber: number | null;
  registered: boolean;
};

/**
 * Model OrganizationAdminChange
 *
 */
export type OrganizationAdminChange = {
  blockNumber: number;
  logIndex: number;
  oldAdmin: string;
  newAdmin: string;
  orgId: number;
};

/**
 * Model Celeb
 *
 */
export type Celeb = {
  id: number;
  address: string;
  nonce: string;
  name: string | null;
  imageCID: string | null;
  dob: Date | null;
  email: string | null;
  bio: string | null;
  verified: boolean;
  registered: boolean;
};

/**
 * Model NFTAttribute
 *
 */
export type NFTAttribute = {
  metadataCID: string;
  trait_type: string;
  value: string;
  display_type: string | null;
};

/**
 * Model NFTMetadata
 *
 */
export type NFTMetadata = {
  cid: string;
  image: string;
  name: string;
  description: string;
  animationURL: string | null;
  external_url: string | null;
  animation_url: string | null;
};

/**
 * Model Deal
 *
 */
export type Deal = {
  id: number;
  celebAddress: string;
  oneOffFees: string;
  orgId: number;
  orgRoyaltyReceier: string;
  done: boolean;
  cancelled: boolean;
};

/**
 * Model Nft
 *
 */
export type Nft = {
  id: number;
  tokenId: number | null;
  dealId: number;
  cid: string;
  royaltyBasisPoints: number;
  orgRoyaltyBasisPoints: number;
  totalSupply: number;
  royaltySplitter: string | null;
  created: boolean;
};

/**
 * Model BlockchainSync
 *
 */
export type BlockchainSync = {
  blockNumber: number;
  transactionHash: string;
  transactionIndex: number;
  logIndex: number;
  type: BlockchainSyncTypes;
};

/**
 * Model NFTTranfer
 *
 */
export type NFTTranfer = {
  tokenId: number;
  blockNumber: number;
  transactionHash: string;
  transactionIndex: number;
  logIndex: number;
  from: string;
  to: string;
  value: number;
  type: TransferType;
};

/**
 * Model Message
 *
 */
export type Message = {
  id: number;
  orgId: number;
  celebId: number;
  unread: boolean;
  type: MessageType;
  sender: SenderType;
  text: string | null;
  imageCID: string | null;
  videoCID: string | null;
  dealId: number | null;
  createdAt: Date;
};

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const BlockchainSyncTypes: {
  DealCreated: "DealCreated";
  DealCompleted: "DealCompleted";
  DealCancelled: "DealCancelled";
  NFTSingleTransfer: "NFTSingleTransfer";
  NFTBatchTransfer: "NFTBatchTransfer";
  OrganizationCreated: "OrganizationCreated";
  OrganizationLocked: "OrganizationLocked";
  OrganizationAdminChanged: "OrganizationAdminChanged";
};

export type BlockchainSyncTypes =
  typeof BlockchainSyncTypes[keyof typeof BlockchainSyncTypes];

export const MessageType: {
  IMAGE: "IMAGE";
  VIDEO: "VIDEO";
  DEAL: "DEAL";
  TEXT: "TEXT";
};

export type MessageType = typeof MessageType[keyof typeof MessageType];

export const SenderType: {
  ORG: "ORG";
  CELEB: "CELEB";
};

export type SenderType = typeof SenderType[keyof typeof SenderType];

export const TransferType: {
  Single: "Single";
  Batch: "Batch";
};

export type TransferType = typeof TransferType[keyof typeof TransferType];
