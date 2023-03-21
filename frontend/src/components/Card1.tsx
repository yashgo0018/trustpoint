import { useEffect, useRef } from "react";

interface Card1Props {
  image: string;
  title: string;
  description: string;
  interaction: string;
  link: string;
  className: string;
}

function Card1(props: Card1Props) {
  const cardRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    cardRef.current?.addEventListener("mousemove", (event): void => {
      const { currentTarget: target } = event;
      const rect = (target as HTMLElement).getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      cardRef.current?.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current?.style.setProperty("--mouse-y", `${y}px`);
    });
  }, []);

  return (
    <div
      className={`relative border-2 border-front border-opacity-10 rounded-3xl overflow-hidden cursor-default
    bg-contain bg-no-repeat bg-right-top before:rounded-inherit before:content-blank before:absolute before:top-0 
    before:left-0 before:w-full before:h-full before:bg-radial-glow before:opacity-0 before:duration-500 
    before:pointer-events-none hover:before:opacity-100 ${props.className}`}
      ref={cardRef}
      style={{ backgroundImage: `url('${props.image}')` }}
    >
      <div className="flex flex-col p-12 mt-40 gap-y-7 w-11/12">
        <h2 className="font-medium text-6xl tracking-tight">{props.title}</h2>
        <p className="text-xl opacity-70">{props.description}</p>
        {props.interaction && (
          <button
            className="btn-3 px-4 py-2"
            onClick={() => {
              window.open(props.link, "_new_window_");
            }}
          >
            {props.interaction}
          </button>
        )}
      </div>
    </div>
  );
}

export default Card1;
