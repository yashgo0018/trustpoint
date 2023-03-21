import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Placeholder from "../../components/Placeholder";

interface Deal {
  id: number | null;
  nft: {
    id: number | null;
    name: string | null;
    quantity: number | null;
    imageUrl: string | null;
  };
  counterParty: string | null;
  amount: number | null;
  royalty: number | null;
}

export default function DealPage() {
  const { id } = useParams();

  const [dealData, setDealData] = useState<Deal>({
    id: null,
    nft: {
      id: null,
      name: null,
      quantity: null,
      imageUrl: null,
    },
    counterParty: null,
    amount: null,
    royalty: null,
  });

  useEffect(() => {
    setTimeout(() => {
      setDealData({
        id: 0,
        nft: {
          id: 1,
          name: "Avatar NFT",
          quantity: 3,
          imageUrl:
            "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/DE40E88CFA65CA2BE5A206038D74438668411C72AAB6D17AA32837D2F08C0F86/scale?width=506&aspectRatio=2.00&format=jpeg",
        },
        counterParty: "Television co.",
        amount: 80,
        royalty: 5,
      });
    }, 2000);
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-28 w-full"></div>
      <section id="NFT-overview" className="p-page flex">
        <div className="basis-1/3 aspect-square flex justify-center items-center">
          {dealData.nft.imageUrl ? (
            <img
              src={dealData.nft.imageUrl}
              alt={`${dealData.nft.name} NFT image`}
              className="max-w-full max-h-full object-contain shadow-lg rounded-sm"
            />
          ) : (
            <Placeholder />
          )}
        </div>
        <div className="basis-2/3 flex flex-col gap-y-12 pl-6">
          <div className="flex flex-col gap-y-3">
            <h2 className="font-mono text-5xl font-black tracking-wider border-b pb-3">
              {dealData.nft.name ? dealData.nft.name : <Placeholder />}
            </h2>
            <h3 className="text-xl font-light tracking-wide text-front text-opacity-70">
              {dealData.counterParty ? dealData.counterParty : <Placeholder />}
            </h3>
          </div>
          <h3 className="text-2xl ">
            {dealData.nft.quantity ? (
              <>
                Supply :{" "}
                <span className="text-primary"> {dealData.nft.quantity}</span>
              </>
            ) : (
              <Placeholder />
            )}
          </h3>
          <Link
            to={`/nft/${dealData.nft.id}`}
            className="w-max flex gap-x-2 items-center btn-3 px-4 py-2 text-xl"
          >
            View
            <span className="material-icons">&#xe89e;</span>
          </Link>
        </div>
      </section>
      <section id="deal-info" className="p-page mt-8">
        <h1 className="font-extralight text-4xl border-b py-3">Deal Details</h1>

        <div className="flex flex-col gap-y-8 pt-8">
          <h3 className="text-2xl ">
            {dealData.amount ? (
              <>
                Fixed Price / One off :{" "}
                <span className="text-primary"> ${dealData.amount}</span>
              </>
            ) : (
              <Placeholder />
            )}
          </h3>
          <h3 className="text-2xl ">
            {dealData.royalty ? (
              <>
                Royalty :{" "}
                <span className="text-primary"> {dealData.royalty}%</span>{" "}
                {`($2k till date)`}
              </>
            ) : (
              <Placeholder />
            )}
          </h3>
        </div>
      </section>
      <Footer />
    </>
  );
}
