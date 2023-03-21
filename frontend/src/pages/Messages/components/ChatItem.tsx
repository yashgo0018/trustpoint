import React, { useEffect, useRef } from "react";
import { Celeb, Message, Organization } from "../../../interfaces/Database";
import { getIPFSImageURL } from "../../../utils/getIPFSImageURL";

interface ChatItemProps {
  sender: Celeb | Organization;
  chat: Message & { celeb: Celeb; org: Organization };
  selectedSender: Celeb | Organization | null;
  setSelectedSender: Function;
}

export default function ChatItem(props: ChatItemProps) {
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    containerRef.current?.addEventListener("mousemove", (event): void => {
      const { currentTarget: target } = event;
      const rect = (target as HTMLElement).getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      containerRef.current?.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current?.style.setProperty("--mouse-y", `${y}px`);
    });
  }, []);
  return (
    <div
      onClick={() => props.setSelectedSender(props.sender)}
      className={`flex relative overflow-hidden py-6 group border-b border-front border-opacity-20 cursor-pointer 
      bg-opacity-0 bg-front duration-150 hover:bg-opacity-10 before:rounded-inherit before:content-blank before:absolute 
      before:top-[var(--mouse-y)] before:-translate-x-1/2 before:-translate-y-1/2  before:blur-3xl before:-z-[1]
      before:left-[var(--mouse-x)] before:aspect-square before:h-3/4 before:bg-primary before:opacity-0 before:duration-800 
      before:pointer-events-none hover:before:opacity-50 before:ease-out ${
        props.selectedSender?.id == props.sender.id
          ? "bg-opacity-10 bg-primary"
          : ""
      }`}
      ref={containerRef}
    >
      <img
        src={getIPFSImageURL(props.sender?.imageCID as string)}
        alt={`${props.sender.name} profile picture`}
        className="aspect-square ml-2 w-1/6 rounded-full border-2 border-transparent bg-gradient-to-br from-primary to-secondary bg-clip-border object-cover"
      />
      <div className="truncate h-full justify-between flex flex-1 flex-col px-4 py-2">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
            {props.sender.name}
          </h3>
          <p className="text-front text-opacity-50">
            {new Date(props.chat.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex justify-between w-full">
          <p className="truncate font-light">{props.chat.text}</p>
          {props.chat.unread && (
            <div className="h-full aspect-square bg-secondary rounded-full ml-3 flex justify-center items-center text-front font-bold">
              !
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
