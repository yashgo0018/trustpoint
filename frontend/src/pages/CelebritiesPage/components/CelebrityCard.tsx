import axios from "axios";
import React, { EventHandler } from "react";

interface CelebrityCardProps {
  id: number;
  name: string;
  imageUrl: string;
  initializeChat: Function;
  showActionButton: boolean;
}

export default function CelebrityCard(props: CelebrityCardProps) {
  return (
    <div className="w-1/4 aspect-square p-2 cursor-default">
      <div
        className="bg-cover bg-center flex h-full flex-col justify-end rounded-[2rem] overflow-hidden duration-500 hover:saturate-150 hover:shadow-inner hover:shadow-back"
        style={{ backgroundImage: `url(${props.imageUrl})` }}
      >
        <div className="bg-back bg-opacity-50 flex justify-between backdrop-blur-md items-center px-2 py-2 rounded-full mx-2 mb-3">
          <h4 className="truncate text-lg font-semibold capitalize px-2">
            {props.name}
          </h4>
          {props.showActionButton && (
            <button
              onClick={props.initializeChat as any}
              className="bg-back rounded-full px-4 py-2 cursor-pointer duration-500 hover:bg-secondary hover:bg-opacity-50"
            >
              Chat
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
