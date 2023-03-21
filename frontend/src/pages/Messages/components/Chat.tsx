import axios from "axios";
import { ethers } from "ethers";
import React, { useContext, useRef, useState } from "react";
import { API_BASE_URL } from "../../../constants";
import { AuthContext } from "../../../context";
import { Celeb, Message, Organization } from "../../../interfaces/Database";
import { DealController } from "../../../typechain-types";
import DealCreationModal from "./DealCreationModal";
import MessageBubble from "./MessageBubble";

interface ChatProps {
  messages: (Message & { celeb: Celeb; org: Organization })[];
  userType: "ORG" | "CELEB";
  selectedSender: Organization | Celeb | null;
  sendTextMessage: Function;
  dealContract: DealController | null;
}

export default function Chat(props: ChatProps) {
  const authContext = useContext(AuthContext);
  // const [currentChat, setCurrentChat] = useState(
  //   [
  //     { content: "Mummy ka payra dush", self: true, datetime: "12/12/2022" },
  //     {
  //       content:
  //         "Mummy ka payra lorem ipsum dolor sit garad popcorn kachra kachra lol lorem ipsum dolor sit garad popcorn kachra kachra lol",
  //       self: false,
  //       datetime: "13/12/2022",
  //     },
  //     {
  //       content:
  //         "humara badla to mera baap lega to mai kya karu mai jaake khana khau? job chod du fir? yahi chahte ho na, sab samajh raha hu mai",
  //       self: true,
  //       datetime: "15/12/2022",
  //     },
  //     {
  //       content:
  //         "yarr ye chat lambi kaise banau kuch samajh nahi aa rha ab jo bhi bakwas dimag me ayegi mai likhte jaane vala hu ab faraq nahi padta mujhe at this point, thoda sa bhi faraq nahi pad raha ab tp kuch bhi likh raha hu mai",
  //       self: false,
  //       datetime: "17/12/2022",
  //     },
  //     {
  //       content:
  //         "Mummy ka payra lorem ipsum dolor sit garad popcorn kachra kachra lol lorem ipsum dolor sit garad popcorn kachra kachra lol",
  //       self: false,
  //       datetime: "13/12/2022",
  //     },
  //     {
  //       content:
  //         "humara badla to mera baap lega to mai kya karu mai jaake khana khau? job chod du fir? yahi chahte ho na, sab samajh raha hu mai",
  //       self: true,
  //       datetime: "15/12/2022",
  //     },
  //     {
  //       content:
  //         "humara badla to mera baap lega to mai kya karu mai jaake khana khau? job chod du fir? yahi chahte ho na, sab samajh raha hu mai",
  //       self: true,
  //       datetime: "15/12/2022",
  //     },
  //     {
  //       content:
  //         "yarr ye chat lambi kaise banau kuch samajh nahi aa rha ab jo bhi bakwas dimag me ayegi mai likhte jaane vala hu ab faraq nahi padta mujhe at this point, thoda sa bhi faraq nahi pad raha ab tp kuch bhi likh raha hu mai",
  //       self: false,
  //       datetime: "17/12/2022",
  //     },
  //   ].slice(0, 4)
  // );

  const messageBox = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [showDealCreationModal, setShowDealCreationModal] = useState(false);

  async function createDeal(data: FormData) {
    if (!props.selectedSender) return;
    if (!props.dealContract) return;

    const celebRoyalty = (
      (Number(data.get("celebRoyalty")?.toString()) * 100) |
      0
    ).toString();
    const orgRoyalty = (
      (Number(data.get("orgRoyalty")?.toString()) * 100) |
      0
    ).toString();
    const oneOffFees = ethers.utils
      .parseEther(data.get("oneOffFees")?.toString() as string)
      .toString();

    data.append("celebId", props.selectedSender.id.toString());
    data.set("celebRoyalty", celebRoyalty);
    data.set("orgRoyalty", orgRoyalty);
    data.set("oneOffFees", oneOffFees);

    const {
      data: { signature, nonce, metadataCID },
    } = await axios.post(`${API_BASE_URL}/deal/`, data, {
      headers: { Authorization: `Bearer ${authContext.token}` },
    });

    const tx = await props.dealContract.createDeal(
      (authContext.org as Organization).id.toString(),
      oneOffFees,
      celebRoyalty,
      orgRoyalty,
      (props.selectedSender as Celeb).address,
      (authContext.org as Organization).admin,
      metadataCID,
      nonce,
      signature,
      {
        value: oneOffFees,
        gasLimit: 3_500_000,
      }
    );
    await tx.wait(1);

    setShowDealCreationModal(false);
  }

  async function acceptDeal(dealId: number, celebRoyaltyReceiver: string) {
    if (!props.dealContract) return;
    console.log(dealId);
    const tx = await props.dealContract.acceptDeal(
      dealId.toString(),
      celebRoyaltyReceiver,
      {
        gasLimit: 1_500_000,
      }
    );
    await tx.wait(1);
  }

  async function cancelDeal(dealId: number) {
    if (!props.dealContract) return;
    const tx = await props.dealContract.cancelDeal(dealId.toString(), {
      gasLimit: 200_000,
    });
    await tx.wait(1);
  }

  return (
    <>
      <div className="flex-1 h-full flex flex-col border-front border-l border-opacity-20">
        <div className="py-2  text-lg font-medium tracking-wider italic text-center bg-foreground text-front">
          {props.selectedSender?.name || "Please select a chat"}
        </div>
        <div className="h-[75vh] flex flex-col p-3 gap-y-6 overflow-y-scroll scrollbar-primary">
          {props.messages.map((message) => (
            <MessageBubble
              message={message}
              self={
                message.sender.toLowerCase() === props.userType.toLowerCase()
              }
              key={message.id}
              acceptDeal={acceptDeal}
              cancelDeal={cancelDeal}
            />
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.sendTextMessage(
              props.selectedSender?.id,
              messageBox.current.value
            );
            messageBox.current.value = "";
          }}
          className="flex p-3 gap-x-2 backdrop-blur-lg border-t border-front border-opacity-30"
        >
          {authContext.userType === "ORG" && (
            <button
              className={`btn-2 px-4 py-2`}
              type="button"
              onClick={() => {
                setShowDealCreationModal(true);
              }}
            >
              <img
                src="/icons/doc.svg"
                alt="deal icon"
                className="brightness-0 invert aspect-square w-5 mr-2"
              />
              Deal
            </button>
          )}
          <input
            type="text"
            accept="image/*"
            className="flex-1 rounded-xl px-2 focus:outline-none"
            ref={messageBox}
            placeholder="Type a message"
          />
          <button type="submit" className="btn-1 bg-opacity-50 rounded-lg">
            <img
              src="/icons/send.svg"
              alt="send message button"
              className="brightness-0 invert px-2 w-12 object-cover"
            />
          </button>
        </form>
      </div>
      <DealCreationModal
        show={showDealCreationModal}
        setShow={setShowDealCreationModal}
        actionButton={createDeal}
      />
    </>
  );
}
