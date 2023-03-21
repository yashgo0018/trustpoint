import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

interface DealCreationModalProps {
  show: Boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  actionButton: Function;
}

function DealCreationModal(props: DealCreationModalProps) {
  const uploadRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  const { show, setShow } = props;

  return (
    <div
      className={`${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      } flex fixed top-0 left-0 w-full h-full z-[101] justify-center items-center bg-back bg-opacity-10 backdrop-blur-md duration-500`}
    >
      <div className="flex flex-col items-center backdrop-blur-3xl shadow-2xl bg-foreground rounded-4xl p-4 gap-y-6">
        <div className="flex justify-end w-full">
          <button
            className="px-6 py-4 bg-primary bg-opacity-30 rounded-2xl duration-300 hover:bg-opacity-80"
            onClick={() => {
              setShow(false);
            }}
          >
            <img
              src="/icons/close.svg"
              alt="close-icon"
              className="w-8 aspect-square brightness-0 invert"
            />
          </button>
        </div>
        <form
          className="flex flex-col gap-y-8 px-14"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.target as HTMLFormElement);
            props.actionButton(data);
          }}
          ref={formRef}
        >
          <div className="border-b border-front pb-4 w-full text-2xl pr-[10vw]">
            Create Deal
          </div>
          <div className="mt-4">
            <p className="px-1 font-light pb-1 text-sm text-front text-opacity-70">
              Upload NFT metadata <Link to={"/help#metadata"}>(reference)</Link>{" "}
            </p>
            <input
              name="metadata"
              type="file"
              accept=".json"
              ref={uploadRef}
              className="rounded-full"
              onChange={() => {}}
            />
          </div>
          <div className="w-full">
            <p className="px-1 font-light pb-1 text-sm text-front text-opacity-70">
              Celebrity Royalty (%)
            </p>
            <input
              name="celebRoyalty"
              placeholder="Royalty in percentage"
              type="number"
              min={0}
              step={0.01}
              max={100}
              className="bg-transparent w-full resize-none border border-front border-opacity-80 rounded-full py-2 px-4 placeholder:text-front placeholder:text-opacity-60"
            />
          </div>
          <div className="w-full">
            <p className="px-1 font-light pb-1 text-sm text-front text-opacity-70">
              Organization Royalty (%)
            </p>
            <input
              name="orgRoyalty"
              placeholder="Royalty in percentage"
              type="number"
              min={0}
              step={0.01}
              max={100}
              className="bg-transparent w-full resize-none border border-front border-opacity-80 rounded-full py-2 px-4 placeholder:text-front placeholder:text-opacity-60"
            />
          </div>
          <div className="w-full">
            <p className="px-1 font-light pb-1 text-sm text-front text-opacity-70">
              One off Fees (Ξ)
            </p>
            <input
              name="oneOffFees"
              placeholder="One time paid fees"
              type="number"
              min={0}
              step={0.01}
              className="bg-transparent w-full resize-none border border-front border-opacity-80 rounded-full py-2 px-4 placeholder:text-front placeholder:text-opacity-60"
            />
          </div>
          <button className="btn-4 px-8 py-2 w-max self-center group font-mono text-xl rounded-full flex items-center gap-x-2 mb-10 duration-300 hover:bg-primary hover:bg-opacity-40 hover:text-front">
            {" "}
            <img
              src="/icons/add.svg"
              alt="metamask-icon"
              className="aspect-square w-[2ch] brightness-0 duration-inherit group-hover:invert"
            />{" "}
            CREATE{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DealCreationModal;
