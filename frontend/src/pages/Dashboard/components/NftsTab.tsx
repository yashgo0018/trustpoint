import React from "react";
import NftCard from "./NftCard";

interface NftsTabProps {
  nfts: {
    id: number;
    name: string;
    quantity: number;
    imageUrl: string;
  }[];
}

function NftsTab(props: NftsTabProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="w-full h-24" />
      <div className="flex-1 grid grid-flow-row grid-cols-4 w-full gap-x-5 gap-y-8 px-4 overflow-y-scroll h-full scrollbar-primary">
        {props.nfts.map((nft) => (
          <NftCard
            id={nft.id}
            name={nft.name}
            quantity={nft.quantity}
            imageUrl={nft.imageUrl}
            key={nft.id}
          />
        ))}
      </div>
    </div>
  );
}

export default NftsTab;
