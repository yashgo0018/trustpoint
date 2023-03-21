import { useContext, useState } from "react";
import { AuthContext } from "../../../context";
import { Celeb, Message, Organization } from "../../../interfaces/Database";
import ChatItem from "./ChatItem";

interface ChatsPanelProps {
  chats: (Message & { celeb: Celeb; org: Organization })[];
  selectedSender: Celeb | Organization | null;
  setSelectedSender: Function;
}

export default function ChatsPanel(props: ChatsPanelProps) {
  const authContext = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-1/3 flex flex-col scrollbar-primary">
      <div className=" bg-front bg-opacity-20 flex">
        <img
          src="/icons/search.svg"
          alt="search-icon"
          className="brightness-0 invert w-11 aspect-square p-2"
        />
        <input
          type="text"
          className="flex-1 border-none text-lg bg-transparent focus:outline-none"
          placeholder="Search"
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
      </div>
      {props.chats
        .filter((chat) =>
          (authContext.userType == "CELEB" ? chat.org.name : chat.celeb.name)
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
        .map((chat) => {
          const sender =
            authContext.userType == "CELEB" ? chat.org : chat.celeb;
          return (
            <ChatItem
              key={chat.id}
              sender={sender}
              chat={chat}
              selectedSender={props.selectedSender || null}
              setSelectedSender={props.setSelectedSender}
            />
          );
        })}
    </div>
  );
}
