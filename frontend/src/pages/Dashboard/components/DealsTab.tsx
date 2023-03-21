import React from "react";
import {
  Celeb,
  Deal,
  Nft,
  NFTMetadata,
  Organization,
} from "../../../interfaces/Database";
import DealCard from "./DealCard";

interface DealsTabProps {
  deals: (Deal & {
    nfts: (Nft & { metadata: NFTMetadata })[];
    org: Organization;
    celeb: Celeb;
  })[];
  userType: "ORG" | "CELEB";
}

function DealsTab(props: DealsTabProps) {
  return (
    <div className="h-full flex flex-col gap-y-4 p-4 overflow-y-scroll scrollbar-primary">
      <div className="">
        <div className="h-16"></div>
      </div>
      {props.deals.map((deal) => (
        <DealCard deal={deal} userType={props.userType} key={deal.id} />
      ))}
    </div>
  );
}

export default DealsTab;
