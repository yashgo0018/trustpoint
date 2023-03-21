import { ethers } from "ethers";
import { Link } from "react-router-dom";
import {
  Celeb,
  Deal,
  Nft,
  NFTMetadata,
  Organization,
} from "../../../interfaces/Database";

function DealCard({
  deal,
  userType,
}: {
  deal: Deal & {
    nfts: (Nft & { metadata: NFTMetadata })[];
    org: Organization;
    celeb: Celeb;
  };
  userType: "ORG" | "CELEB";
}) {
  return (
    <div className="bg-foreground flex p-6 rounded-xl shadow-inner shadow-primary">
      <img
        src={deal.nfts[0].metadata.image}
        alt={`${deal.celeb.address} deal card`}
        className="w-1/5 aspect-square object-cover rounded-md bg-gradient-to-b from-emerald-500 to-green-900"
      />
      <div className="flex flex-col px-5 gap-y-3">
        <p className="text-3xl font-mono tracking-tighter">
          {userType === "ORG" ? deal.celeb.name : deal.org.name}
        </p>
        <p>Amount : {ethers.utils.formatEther(deal.oneOffFees)}</p>
        <p>Royalty : {deal.nfts[0].royaltyBasisPoints / 100} %</p>
        <Link to={`/deal/${0}`} className="btn-3 px-3 py-2 mt-3">
          {" "}
          View Details{" "}
        </Link>
      </div>
    </div>
  );
}

export default DealCard;
