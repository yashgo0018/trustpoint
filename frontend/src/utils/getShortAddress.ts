export default function getShortAddress(address: string | null) {
  return `${address?.slice(0, 5)}...${address?.slice(address.length - 5)}`;
}
