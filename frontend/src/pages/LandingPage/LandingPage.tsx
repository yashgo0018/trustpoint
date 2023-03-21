import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card1 from "../../components/Card1";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const promotionCards = [
    {
      image: "/images/brand-promotional-illustration-1.png",
      title: "Zero-Trust Policy",
      description:
        "Game Houses don't trust influencers/celebs. Celebs don't trust Game houses. You don't trust us. We don't trust you. Yet, we are all able to come together and make a deal by harnessing the zero trust powers of web 3 technologies.",
      link: "https://blockbuild.africa/the-concept-of-blockchain-in-zero-trust/",
    },
    {
      image: "/images/brand-promotional-illustration-2.png",
      title: "Unbeatable Privacy",
      description:
        "In no way can your deals be interacted with by someone other than you and you only. Security is our utmost concern and it should be yours as well. We've considered all possibilities and developed a  marketplace for all parties.",
      link: "https://blockbuild.africa/the-concept-of-blockchain-in-zero-trust/",
    },
  ];

  const socialLinks = [
    {
      icon: "",
      title: "Telegram",
      link: "https://t.me/trustpointdapp",
      color: "#22aaee",
    },
    {
      icon: "https://www.mantle.xyz/twitter-logo.svg",
      title: "Twitter",
      link: "https://twitter.com/TrustPointDapp",
      color: "#2277dd",
    },
    {
      icon: "https://www.mantle.xyz/telegram-logo.svg",
      title: "Telegram",
      link: "https://t.me/trustpointdapp",
      color: "#ffffff",
    },
  ];

  return (
    <>
      <Navbar />
      <section className="hero relative p-page flex widescreen:min-h-screen">
        <img
          src="/images/hero-gradient.png"
          alt="hero-gradient"
          className="absolute top-0 left-0 w-full h-full object-cover object-right-top -z-10"
        />
        <div className="hero-left basis-1/2 flex flex-col justify-center gap-y-8">
          <div className="bg-front bg-opacity-[0.08] w-max py-2 px-5 text-xl font-medium text-front rounded-md text-opacity-80">
            {"NFT Collaborations Made Easy".toLocaleUpperCase()}
          </div>
          <h1 className="text-7xl font-semibold">
            Effortless NFT Collaborations
          </h1>
          <p className="text-xl text-front text-opacity-80">
            TrustPoint's platform streamlines the process of creating NFT
            collaborations between game companies and celebrities. With an
            effortless approach, TrustPoint empowers game companies to bring
            unique NFT experiences to their users
          </p>
          <div className="flex items-center gap-x-10">
            <Link className="btn-2 px-4 py-2" to="/auth">
              Get Started
            </Link>
          </div>
        </div>
        <div className="hero-right basis-1/2"></div>
      </section>
      <section className="p-page relative">
        <h1 className="text-5xl font-semibold">
          Your NFT Deals on{" "}
          <span className="text-gradient-to-r from-primary to-secondary">
            The Web3
          </span>
        </h1>
        <p className="w-7/12 py-5 opacity-70 text-lg font-light">
          TrustPoint makes it easy for game companies and celebrities to
          collaborate and create unique NFT experiences for users on Web3. With
          TrustPoint, you can sign deals quickly and easily, bringing your NFT
          collaborations to life.
        </p>
        <div className="flex flex-wrap justify-between py-16">
          {promotionCards.map((card) => {
            return (
              <Card1
                className="max-w-[48%]"
                key={promotionCards.indexOf(card)}
                image={card.image}
                title={card.title}
                description={card.description}
                interaction="Learn More"
                link={card.link}
              />
            );
          })}
        </div>
      </section>
      <section id="socials" className="my-10 p-page">
        <h1 className="text-front font-medium text-7xl font-raleway text-center my-14">
          Get Involved
        </h1>

        <div className="flex justify-between">
          <div
            className={`w-[28%] bg-gradient-to-br from-[#22aaee77] to-[#22aaee33] flex flex-col justify-center items-center p-8 
          rounded-3xl border-2 border-background duration-500 cursor-pointer hover:border-[#22aaee]`}
            onClick={() => {
              window.open("https://t.me/trustpointdapp", "_blankNew");
            }}
          >
            <img
              className="aspect-square w-14 m-4"
              src="https://www.mantle.xyz/telegram-logo.svg"
              alt="telegram"
            />
            <p className="text-white saturate-200 capitalize">Telegram</p>
          </div>

          <div
            className={`w-[28%] bg-gradient-to-br from-[#2277dd77] to-[#2277dd33] flex flex-col justify-center items-center p-8 
          rounded-3xl border-2 border-background duration-500 cursor-pointer hover:border-[#2277dd]`}
            onClick={() => {
              window.open("https://twitter.com/trustpointdapp", "_blankNew");
            }}
          >
            <img
              className="aspect-square w-14 m-4"
              src="https://www.mantle.xyz/twitter-logo.svg"
              alt="twitter"
            />
            <p className="text-white saturate-200 capitalize">Twitter</p>
          </div>

          <div
            className={`w-[28%] bg-gradient-to-br from-[#7289da77] to-[#7289da33] flex flex-col justify-center items-center p-8 
          rounded-3xl border-2 border-background duration-500 cursor-pointer hover:border-[#7289da]`}
            onClick={() => {
              window.open("https://discord.gg/AWsNcpSx3G", "_blankNew");
            }}
          >
            <img
              className="aspect-square w-14 m-4"
              src="https://www.mantle.xyz/discord-logo.svg"
              alt="discord"
            />
            <p className="text-white saturate-200 capitalize">Discord</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
