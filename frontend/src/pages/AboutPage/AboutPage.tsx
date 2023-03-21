import React from "react";
import Navbar from "../../components/Navbar";

export default function HelpPage() {
  return (
    <div className="">
      <Navbar />
      <div className="h-20"></div>
      <section className="p-page bg-[url('/images/help-hero.jpg')] bg-cover aspect-[1280/640] flex flex-col justify-between items-center">
        <div className="my-6 font-extralight text-xl">
          Welcome to TrustPoint
        </div>
        <div className="text-front bg-foreground bg-opacity-50 text-center backdrop-blur-lg shadow-lg rounded-full px-12 py-4 mb-6 text-3xl font-semibold tracking-tight">
          We aim to make all NFT collaborations <br /> effortless and secure
        </div>
      </section>
    </div>
  );
}
