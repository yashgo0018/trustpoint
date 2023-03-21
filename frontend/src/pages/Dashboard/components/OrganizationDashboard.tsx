import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { API_BASE_URL } from "../../../constants";
import { AuthContext } from "../../../context";
import {
  Celeb,
  Deal,
  NFTMetadata,
  Organization,
  Nft,
} from "../../../interfaces/Database";
import DealsTab from "./DealsTab";
import NavigationTabs from "./NavigationTabs";
import NftsTab from "./NftsTab";

export default function UserDashboard() {
  const authContext = useContext(AuthContext);
  const [currentTab, setCurrentTab] = useState("Pending Deals");
  const [deals, setDeals] = useState<
    (Deal & {
      nfts: (Nft & { metadata: NFTMetadata })[];
      org: Organization;
      celeb: Celeb;
    })[]
  >([]);

  useEffect(() => {
    if (!authContext.token) return;
    (async () => {
      const {
        data: { deals: deals_ },
      } = await axios.get(`${API_BASE_URL}/deal`, {
        headers: { Authorization: `Bearer ${authContext.token}` },
      });
      setDeals(deals_);
    })();
  }, [authContext.token]);

  const tabs = [
    "Pending Deals",
    "Rejected Deals",
    "Completed Deals",
    "NFTs",
    "Settings",
  ];

  const dummyDeals = [
    {
      counterParty: "Epic Devs",
      amount: 80,
      royalty: 5,
      imageUrl:
        "https://i.pinimg.com/736x/31/54/be/3154be740af7c92e7e6137e23cf95880.jpg",
    },
    {
      counterParty: "SuperBowls",
      amount: 20,
      royalty: 60,
      imageUrl:
        "https://elitemen.com.au/wp-content/uploads/2021/08/Visa-NFT-main.jpg",
    },
    {
      counterParty: "Clash Royal",
      amount: 80,
      royalty: 5,
      imageUrl:
        "https://uploads-ssl.webflow.com/5d8b8e1a530827a377adfa29/61befe03c5e111052d39dbc3_Confidential%20Cats%20NFT%20Review%20Teaser%203.jpeg",
    },
    {
      counterParty: "Marsian inc.",
      amount: 83,
      royalty: 69,
      imageUrl:
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/75de90135789505.61ee65ffebeae.jpg",
    },
    {
      counterParty: "Mummy ki Dukan",
      amount: 20,
      royalty: 70,
      imageUrl:
        "https://images.squarespace-cdn.com/content/v1/58d09402db29d660e4781a57/1619307661156-633A64D5QIIDUAGOUPEJ/culture_cryptocurrency.png",
    },
  ];

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

  return (
    <>
      <Navbar />
      {/* <Link to="/messages">
        <img src="/icons/message.svg" alt="message icon" />
      </Link> */}
      <div className="p-page h-screen flex">
        <div className="absolute top-[25%] -left-[10%] w-[60vw] h-[50vh] rounded-full rotate-45 bg-gradient-to-r -z-[1] pointer-events-none from-primary to-secondary opacity-10 blur-[6rem]"></div>
        <div className="absolute top-[25%] -left-[10%] w-[60vw] h-[50vh] rounded-full -rotate-45 bg-gradient-to-r -z-[1] pointer-events-none from-blue-600 to-pink-500 opacity-10 blur-[6rem]"></div>
        <div className="h-full">
          <NavigationTabs tabs={tabs} setCurrentTab={setCurrentTab} />
        </div>
        {(() => {
          switch (currentTab) {
            case tabs[0]:
              return (
                <DealsTab
                  deals={deals.filter((deal) => !deal.done && !deal.cancelled)}
                  userType={authContext.userType || "ORG"}
                />
              );
            case tabs[1]:
              return (
                <DealsTab
                  deals={deals.filter((deal) => deal.cancelled)}
                  userType={authContext.userType || "ORG"}
                />
              );
            case tabs[2]:
              return (
                <DealsTab
                  deals={deals.filter((deal) => deal.done)}
                  userType={authContext.userType || "ORG"}
                />
              );
            case tabs[3]:
              return <NftsTab nfts={dummyNfts} />;
            case tabs[4]:
              return <NftsTab nfts={dummyNfts} />;
            default:
              break;
          }
        })()}
      </div>
      <Footer />
    </>
  );
}
