import { IPFS_BASE_URL } from "../constants";

export function getIPFSImageURL(imageCID: string, hex = true) {
  return `${IPFS_BASE_URL}/${hex ? "f" : ""}${(imageCID as string).slice(2)}`;
}
