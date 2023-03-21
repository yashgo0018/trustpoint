import axios from "axios";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import Navbar from "../../components/Navbar";
import { API_BASE_URL, DEAL_CONTRACT_ADDRESS } from "../../constants";
import { AuthContext } from "../../context";
import { Celeb, Message, Organization } from "../../interfaces/Database";
import { DealController } from "../../typechain-types";
import Chat from "./components/Chat";
import ChatsPanel from "./components/ChatsPanel";
import DEAL_CONTRACT_ABI from "../../abi/DealController.json";

export default function Messages() {
  const authContext = useContext(AuthContext);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedSender, setSelectedSender] = useState<
    Organization | Celeb | null
  >(null);
  const [messages, setMessages] = useState<
    (Message & { celeb: Celeb; org: Organization })[]
  >([]);
  const [socket, setSocket] = useState<Socket>();
  const [dealContract, setDealContract] = useState<DealController | null>(null);
  const [chats, setChats] = useState<
    (Message & { celeb: Celeb; org: Organization })[]
  >([]);
  const [newMessage, setNewMessage] = useState<string>();

  useEffect(() => {
    if (!authContext.signer) return;
    const _dealContract = new ethers.Contract(
      DEAL_CONTRACT_ADDRESS,
      DEAL_CONTRACT_ABI,
      authContext.signer
    ) as DealController;
    setDealContract(_dealContract);
  }, [authContext.signer]);

  useEffect(function () {
    (async () => {
      const {
        data: { messages },
      } = await axios.get(`${API_BASE_URL}/chat/`, {
        headers: { Authorization: `Bearer ${authContext.token}` },
      });
      setChats(messages);
    })();
    const socket = io(API_BASE_URL, {
      extraHeaders: { token: authContext.token as string },
    });
    setSocket(socket);
  }, []);

  useEffect(
    function () {
      if (!socket) return;
      socket.removeAllListeners();
      socket.on("connect", function () {
        setIsConnected(true);
      });

      socket.on("disconnect", function () {
        setIsConnected(false);
      });

      socket.on("message", setNewMessage);

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("message");
      };
    },
    [socket, selectedSender, authContext.userType]
  );

  useEffect(() => {
    if (!newMessage) return;
    const messageObj = JSON.parse(newMessage);
    const newChats = chats.filter(
      (chat) =>
        chat.celebId != messageObj.celebId || chat.orgId != messageObj.orgId
    );
    if (
      selectedSender &&
      (authContext.userType == "CELEB" ? messageObj.org : messageObj.celeb)
        .id == selectedSender.id
    ) {
      setMessages([...messages, messageObj]);
    }
    newChats.unshift(messageObj);
    setChats(newChats);
  }, [newMessage]);

  useEffect(() => {
    (async () => {
      let messages = [];
      if (selectedSender) {
        console.log(selectedSender);
        const { data } = await axios.get(
          `${API_BASE_URL}/chat/${selectedSender.id}`,
          {
            headers: { Authorization: `Bearer ${authContext.token}` },
          }
        );
        messages = data.messages;
      }
      console.log(messages);
      setMessages(messages);
    })();
  }, [selectedSender]);

  function sendTextMessage(to: number, message: string) {
    console.log(to);
    socket?.emit("send_message", JSON.stringify({ to, text: message }));
  }

  return (
    <div className="overflow-hidden relative">
      <Navbar />
      <div className="w-[50vw] h-[80vh] absolute -z-[2] top-24 -left-[20vw] blur-3xl rounded-full bg-gradient-to-tr from-primary via-cyan-700 to-secondary opacity-10"></div>
      <div className="w-[40vw] h-[70vh] absolute -z-[2] bottom-5 -right-[20vw] blur-3xl rounded-full bg-gradient-to-br from-pink-500 via-blue-400 to-secondary opacity-10"></div>
      {chats.length ? (
        <div className="h-screen flex p-page flex-col">
          <div className="h-24 w-full" />
          <div className="flex border-x border-front border-opacity-20 flex-1">
            <ChatsPanel
              setSelectedSender={setSelectedSender}
              selectedSender={selectedSender}
              chats={chats}
            />
            <Chat
              sendTextMessage={sendTextMessage}
              messages={messages}
              selectedSender={selectedSender}
              dealContract={dealContract}
              userType={authContext.userType as "ORG" | "CELEB"}
            />
          </div>
        </div>
      ) : (
        <div className="h-screen flex flex-col text-center justify-center items-center text-front italic text-2xl gap-y-3 font-light">
          you have no messages <br />
          please initiate a chat first <br />
          <Link
            to="/celebrities"
            className="my-4 border-b border-primary font-extralight tracking-tighter duration-300 hover:border-opacity-0"
          >
            click here to see all available celebs to chat with
          </Link>
        </div>
      )}
    </div>
  );
}
