import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import useImageColor from "../../hooks/useImageColor";

const dummyNfts = [
  {
    id: 0,
    name: "EminemCon",
    quantity: 9,
    imageUrl:
      "https://variety.com/wp-content/uploads/2017/10/eminem.jpg?w=681&h=383&crop=1",
  },
  {
    id: 1,
    name: "JohnWicky",
    quantity: 3,
    imageUrl:
      "https://cdn.vox-cdn.com/thumbor/Dc8bBshDmxtKUCeTFovjt_pz_bM=/0x0:1777x999/1200x800/filters:focal(708x235:992x519)/cdn.vox-cdn.com/uploads/chorus_image/image/63756879/parabellumcover.0.jpg",
  },
  {
    id: 2,
    name: "BillieEyelash",
    quantity: 80,
    imageUrl:
      "https://external-preview.redd.it/aw5qykqjkyizl9zMO70cEvhT8pA2wE0Vuu4l0FiEhHg.jpg?auto=webp&s=e86b6d30a5eb327bb65bb3ab336fe742484ccde1",
  },
  {
    id: 3,
    name: "Spandan",
    quantity: 9,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5VX40WifP2PbyRdm-592mbpOLgjyhWxf7yg&usqp=CAU",
  },
  {
    id: 4,
    name: "CryptoDunk",
    quantity: 11,
    imageUrl:
      "https://www.cnet.com/a/img/resize/c5b48e90abe8b7fe339fc0139f3834dbe434fee5/hub/2021/11/29/f566750f-79b6-4be9-9c32-8402f58ba0ef/richerd.png?auto=webp&width=1200",
  },
  {
    id: 5,
    name: "Chupacabra",
    quantity: 78,
    imageUrl:
      "https://cdn.geekwire.com/wp-content/uploads/2022/07/melaniabilustracion-No-Planet-B-square.jpg",
  },
  {
    id: 6,
    name: "PizzaMan",
    quantity: 4,
    imageUrl: "https://www.nrn.com/sites/nrn.com/files/chefpizza_0.jpg",
  },
  {
    id: 7,
    name: "Yash Goyal",
    quantity: 555,
    imageUrl: "https://images.barrons.com/im-492408?width=700&height=1050",
  },
  {
    id: 8,
    name: "EminemCon",
    quantity: 9,
    imageUrl:
      "https://variety.com/wp-content/uploads/2017/10/eminem.jpg?w=681&h=383&crop=1",
  },
  {
    id: 9,
    name: "JohnWicky",
    quantity: 3,
    imageUrl:
      "https://cdn.vox-cdn.com/thumbor/Dc8bBshDmxtKUCeTFovjt_pz_bM=/0x0:1777x999/1200x800/filters:focal(708x235:992x519)/cdn.vox-cdn.com/uploads/chorus_image/image/63756879/parabellumcover.0.jpg",
  },
  {
    id: 10,
    name: "BillieEyelash",
    quantity: 80,
    imageUrl:
      "https://external-preview.redd.it/aw5qykqjkyizl9zMO70cEvhT8pA2wE0Vuu4l0FiEhHg.jpg?auto=webp&s=e86b6d30a5eb327bb65bb3ab336fe742484ccde1",
  },
];

export default function NftPage() {
  const [nft, setNft] = useState<{
    id: number;
    name: string;
    quantity: number;
    imageUrl: string;
  }>();
  const [colorPallete, setColorPallete] = useState<string[]>(["#00dde3"]);

  const { id } = useParams();

  useEffect(() => {
    setNft(dummyNfts.filter((nft) => nft.id === Number(id))[0]);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="h-24"></div>
      <img
        src={nft?.imageUrl}
        alt={`${nft?.name} NFT image`}
        className="absolute left-32 -translate-x-1/2 top-[50vh] -translate-y-1/2 blur-[7rem] opacity-30 rounded-full aspect-square object-cover h-[60vh]"
      />
      <section className="flex h-[80vh] p-page">
        <div className="basis-1/2 flex flex-col">
          <div className="">
            <button
              className="flex items-center px-3 py-2 bg-primary bg-opacity-10 rounded-lg duration-300 group hover:text-back hover:bg-opacity-80"
              onClick={() => {
                navigate(-1);
              }}
            >
              <img
                src="/icons/back.svg"
                alt="close-icon"
                className="w-6 mr-3 aspect-square brightness-0 invert duration-inherit group-hover:invert-0"
              />
              <p>BACK</p>
            </button>
          </div>
          <div className="my-5 border-front border-opacity-50 border-b py-5 font-mono font-black text-7xl text-front">
            {nft?.name}
          </div>
          <p className="text-3xl">
            Total :{" "}
            <span className="text-primary text-opacity-80">
              {nft?.quantity}
            </span>{" "}
          </p>
          <div className="flex-1 flex justify-center items-center">
            <button className="btn-2 px-5 text-4xl py-3">
              <img
                src="/icons/add.svg"
                alt="add icon"
                className="aspect-square w-10 mr-3 brightness-0 invert"
              />
              MINT
            </button>
          </div>
        </div>
        <div className="basis-1/2 relative flex justify-center items-center p-12">
          <img
            src={nft?.imageUrl}
            alt={`${nft?.name} NFT image`}
            className="w-full h-full object-contain"
          />
          <div className="absolute p-10 blur-3xl -z-[1] left-0 top-0 w-full h-full flex justify-center opacity-30 items-center">
            <img
              src={nft?.imageUrl}
              alt={`${nft?.name} NFT image`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>
      <section className="h-screen"></section>
    </div>
  );
}
