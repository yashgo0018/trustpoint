import React, { useRef, useState } from "react";

interface RegisterModalProps {
  show: Boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  actionButton: Function;
}

function ImageUploadModal(props: RegisterModalProps) {
  const imageUploadRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [imagePreview, setImagePreview] = useState(
    "/images/default-profile.jpg"
  );

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
          className="flex flex-col items-center gap-y-12 px-14"
          onSubmit={(event) => {
            event.preventDefault();
            props.actionButton(imageUploadRef);
          }}
        >
          <div className="border-b border-front py-4 w-full text-2xl pr-[10vw]">
            Upload a profile picture
          </div>
          <img
            src={imagePreview}
            alt="Profile Picture preview"
            draggable={false}
            placeholder="Choose a custom picture"
            className="w-48 border-2 rounded-full object-cover aspect-square"
          />
          <input
            type="file"
            ref={imageUploadRef}
            className="rounded-full"
            onChange={() => {
              setImagePreview(
                URL.createObjectURL(
                  (imageUploadRef.current.files as FileList)[0]
                )
              );
            }}
          />
          <button className="btn-4 px-8 py-2 w-max self-center font-mono text-xl rounded-full flex items-center gap-x-3 mb-10 duration-300 hover:bg-primary hover:bg-opacity-40 hover:text-front">
            {" "}
            <img
              src="/icons/metamask.svg"
              alt="metamask-icon"
              className="aspect-square w-[3ch]"
            />{" "}
            CONNECT{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ImageUploadModal;
