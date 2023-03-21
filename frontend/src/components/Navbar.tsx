import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import gsap from "gsap";
import Flip from "gsap/Flip";
import { ethers } from "ethers";
import { AuthContext } from "../context";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import getShortAddress from "../utils/getShortAddress";

gsap.registerPlugin(Flip);

export default function Navbar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Celebs", to: "/celebrities" },
    { name: "Help", to: "/help" },
    { name: "About", to: "/about" },
  ];

  async function connect() {
    if (!authContext.provider) return;
    await authContext.provider.send("eth_requestAccounts", []);
    const signer = authContext.provider.getSigner();
    const address = await signer.getAddress();
    const {
      data: { registered, type },
    } = await axios.get(`${API_BASE_URL}/user/check/${address}`);
    if (!registered) {
      // redirect to register page
      navigate("/auth");
      return;
    }
    const {
      data: { message },
    } = await axios.get(
      `${API_BASE_URL}/${type.toLowerCase()}/auth/nonce/${address}`
    );
    const signature = await signer.signMessage(message);
    const {
      data: { org, celeb, token },
    } = await axios.post(`${API_BASE_URL}/${type.toLowerCase()}/auth/login`, {
      address,
      signature,
    });
    authContext.setAccount(address);
    authContext.setUserType(type);
    authContext.setSigner(signer);
    authContext.setToken(token);
    if (type == "ORG") authContext.setOrg(org);
    else authContext.setCeleb(celeb);
  }

  const navbarLinkHoverBg =
    useRef() as React.MutableRefObject<HTMLInputElement>;

  function navbarLinkHover(link: EventTarget) {
    //move the floaty hover background
    const state = Flip.getState(navbarLinkHoverBg.current);
    (link as HTMLElement).appendChild(navbarLinkHoverBg.current);
    Flip.from(state, {
      duration: 0.5,
      absolute: true,
      ease: "elastic.out(1,1)",
    });
  }

  return (
    <>
      <nav className="p-page z-[100] fixed w-full flex justify-between items-center bg-[#0000001E] text-front py-5 backdrop-blur-3xl">
        <div className="navbar-left">
          <Link to={authContext.token ? "/dashboard" : "/"}>
            <img
              src="/images/brand-name.png"
              alt="brand-name"
              className="h-7"
              draggable="false"
            />
          </Link>
        </div>
        <div className="navbar-mid flex gap-x-16">
          {navLinks.map((link) => {
            return (
              <Link
                to={link.to}
                key={link.to}
                className="relative opacity-70 duration-300 hover:opacity-100 group"
                onMouseEnter={(event) => {
                  navbarLinkHover(event.target);
                }}
              >
                {link.name}
                {navLinks.indexOf(link) === 0 && (
                  <div
                    className="navbar-link-hover-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-md bg-front opacity-0 -z-[1] group-hover:opacity-10 pointer-events-none"
                    ref={navbarLinkHoverBg}
                  />
                )}
              </Link>
            );
          })}
        </div>
        <div className="navbar-right flex items-center gap-x-6">
          <button
            onClick={() => {
              window.open("/discord", "__blank__");
            }}
          >
            <img
              src="https://www.svgrepo.com/show/353655/discord-icon.svg"
              alt="discord-icon"
              className="h-7 brightness-0 invert opacity-70 hover:opacity-100 hover:scale-105 duration-300"
            />
          </button>
          {authContext.token ? (
            <button
              className="border-2 border-tertiary rounded-xl px-4 py-1"
              onClick={() => {
                if (confirm("logout?")) {
                  location.reload();
                }
              }}
            >
              {getShortAddress(authContext.account)}
            </button>
          ) : (
            <button
              onClick={connect}
              className="bg-primary py-1 px-8 rounded-xl font-medium text-lg text-back duration-500 hover:bg-secondary"
            >
              Join now
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
