import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingBubblesBackground from "../../components/FloatingBubblesBackground";
import gsap from "gsap";
import Flip from "gsap/Flip";
import ImageUploadModal from "./components/ImageUploadModal";
import { AuthContext } from "../../context";
import axios from "axios";
import { API_BASE_URL } from "../../constants";

gsap.registerPlugin(Flip);

const organizationInputs: InputsProps = {
  type: "ORG",
  items: [
    {
      name: "name",
      type: "text",
      placeholder: "Enter your organization's name",
      required: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Enter your business email",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      placeholder: "Describe your organization",
      required: true,
      minLength: 100,
      maxLength: 250,
      rows: 5,
    },
  ],
};

const CelebrityInputs: InputsProps = {
  type: "CELEB",
  items: [
    {
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "bio",
      type: "textarea",
      placeholder: "I am a...",
      required: true,
      minLength: 100,
      maxLength: 250,
      rows: 5,
    },
  ],
};

const inputsTransitionDuration = 200; //in ms

function Auth() {
  const authContext = useContext(AuthContext);

  const [inputsArray, setInputsArray] =
    useState<InputsProps>(organizationInputs);
  const [showImageUploadModal, setShowImageUploadModal] =
    useState<boolean>(false);

  const authPanel = useRef() as React.MutableRefObject<HTMLDivElement>;
  const organizationPanelContainer =
    useRef() as React.MutableRefObject<HTMLDivElement>;
  const celebrityPanelContainer =
    useRef() as React.MutableRefObject<HTMLDivElement>;
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  const navigate = useNavigate();

  async function connectMetamaskasync(
    imageUploadRef: React.MutableRefObject<HTMLInputElement>
  ) {
    if (!(imageUploadRef.current.files && imageUploadRef.current.files[0]))
      return alert("Please upload an image");
    if (!authContext.provider) return;
    await authContext.provider.send("eth_requestAccounts", []);
    const signer = authContext.provider.getSigner();
    const address = await signer.getAddress();
    const {
      data: { registered },
    } = await axios.get(`${API_BASE_URL}/user/check/${address}`);
    if (registered) {
      // redirect to register page
      alert("already registered");
      navigate("/");
      return;
    }
    const type = inputsArray.type;
    const {
      data: { message },
    } = await axios.get(`${API_BASE_URL}/${type}/auth/nonce/${address}`);
    const signature = await signer.signMessage(message);

    const data = new FormData();
    for (let inputField of inputsArray.items) {
      data.append(
        inputField.name,
        (
          formRef.current.elements.namedItem(
            inputField.name
          ) as HTMLInputElement
        ).value
      );
    }
    data.append("address", address);
    data.append("signature", signature);
    data.append("image", imageUploadRef.current.files[0]);

    const {
      data: { org, celeb, token },
    } = await axios.post(
      `${API_BASE_URL}/${type.toLowerCase()}/auth/register`,
      data
    );
    authContext.setAccount(address);
    authContext.setUserType(type);
    authContext.setSigner(signer);
    authContext.setToken(token);
    if (type == "ORG") authContext.setOrg(org);
    else authContext.setCeleb(celeb);
    navigate("/dashboard");
  }

  function changePanelContainer(container: HTMLElement) {
    //move the panel into another container
    const state = Flip.getState(authPanel.current);
    container.appendChild(authPanel.current);
    Flip.from(state, {
      duration: (inputsTransitionDuration * 2) / 1000,
      absolute: true,
      ease: "elastic.out(1,1)",
    });
  }

  return (
    <section className="h-screen flex flex-col overflow-hidden">
      <div className="-z-[3] absolute top-0 left-0 w-full h-full blur-[8rem]">
        {" "}
        <FloatingBubblesBackground />{" "}
      </div>
      <div
        className="-z-[1] absolute top-0 left-0 w-full h-full"
        style={
          {
            "--vignette-color": "#000000ff",
            backgroundImage:
              "linear-gradient(to bottom, var(--vignette-color), transparent, var(--vignette-color)), linear-gradient(to right, var(--vignette-color), var(--vignette-color), transparent, var(--vignette-color), var(--vignette-color))",
            backgroundSize: "200% 100%",
            backgroundPosition: `${
              inputsArray === organizationInputs ? 25 : 75
            }% 50%`,
            transition: `background-position ${2 * inputsTransitionDuration}ms`,
          } as React.CSSProperties
        }
      />
      <div className="p-page py-4 flex justify-between items-center bg-[#0000001E] backdrop-blur-3xl">
        <button
          className="flex items-center top-6 left-6 px-6 py-4 bg-primary bg-opacity-10 rounded-2xl duration-300 group hover:text-back hover:bg-opacity-80"
          onClick={() => {
            navigate(-1);
          }}
        >
          <img
            src="/icons/back.svg"
            alt="close-icon"
            className="w-8 mr-5 aspect-square brightness-0 invert duration-inherit group-hover:invert-0"
          />
          <p>BACK</p>
        </button>
        <div className="flex justify-center items-center gap-x-16">
          {[
            {
              title: "I'm an organization",
              inputs: organizationInputs,
              panelContainer: organizationPanelContainer,
            },
            {
              title: "I'm an influencer",
              inputs: CelebrityInputs,
              panelContainer: celebrityPanelContainer,
            },
          ].map((btn) => (
            <button
              key={btn.title}
              onClick={() => {
                setTimeout(() => {
                  setInputsArray(btn.inputs);
                }, inputsTransitionDuration / 3);
                changePanelContainer(btn.panelContainer.current);
              }}
              className={`px-3 py-1 duration-200 ${
                inputsArray == btn.inputs
                  ? "bg-front bg-opacity-20 rounded-lg"
                  : "underline"
              } hover:no-underline`}
            >
              {btn.title}
            </button>
          ))}
        </div>
        <div className="w-36" />
      </div>
      <div className="flex flex-1">
        <div
          className="basis-1/2 flex justify-center items-center"
          ref={organizationPanelContainer}
        >
          <div
            className="flex w-max flex-col items-center backdrop-blur-3xl shadow-xl bg-gray-800 bg-opacity-20 rounded-4xl py-12 gap-y-6"
            ref={authPanel}
          >
            <form
              className="flex flex-col gap-y-12 px-14"
              ref={formRef}
              onSubmit={(event) => {
                event.preventDefault();
                setShowImageUploadModal(true);
              }}
            >
              <div className="border-b border-front pb-4 w-full text-2xl pr-[10vw]">
                Connect via MetaMask
              </div>
              <Inputs items={inputsArray.items} type={inputsArray.type} />
              <button className="btn-4 px-8 py-2 w-max self-center font-mono text-xl rounded-full group flex items-center gap-x-3 duration-300 hover:bg-primary hover:bg-opacity-40 hover:text-front">
                {" "}
                <img
                  src="/icons/login.svg"
                  alt="login-icon"
                  className="aspect-square w-[3ch] brightness-0 duration-inherit group-hover:invert "
                />{" "}
                REGISTER{" "}
              </button>
            </form>
          </div>
        </div>
        <div
          className="basis-1/2 flex justify-center items-center"
          style={{
            transition: `transform : ${inputsTransitionDuration}ms, filter : ${inputsTransitionDuration}ms`,
          }}
          ref={celebrityPanelContainer}
        ></div>
      </div>
      <ImageUploadModal
        show={showImageUploadModal}
        setShow={setShowImageUploadModal}
        actionButton={connectMetamaskasync}
      />
    </section>
  );
}

interface InputsProps {
  type: "ORG" | "CELEB";
  items: {
    name: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    rows?: number;
  }[];
}

function Inputs(props: InputsProps) {
  const containerRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <div ref={containerRef} className="flex flex-col gap-y-12">
      {props.items.map((item) => {
        const Element = item.type === "textarea" ? "textarea" : "input";
        return (
          <Element
            type={item.type}
            name={item.name}
            key={item.name}
            placeholder={item.placeholder}
            minLength={item.minLength}
            maxLength={item.maxLength}
            required={item.required || false}
            rows={item.rows}
            className="bg-transparent resize-none border border-front border-opacity-80 rounded-lg py-2 px-4 placeholder:text-front placeholder:text-opacity-60"
          />
        );
      })}
    </div>
  );
}

export default Auth;
