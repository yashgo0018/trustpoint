import React, { useRef } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

interface NavigationTabsProps {
  tabs: string[];
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

function NavigationTabs(props: NavigationTabsProps) {
  const activeTabIndicator =
    useRef() as React.MutableRefObject<HTMLInputElement>;

  function NavigationTabSelect(tab: EventTarget, tabText: string) {
    //move the floaty background
    const state = Flip.getState(activeTabIndicator.current);
    activeTabIndicator.current.textContent = tabText;
    (tab as HTMLElement).appendChild(activeTabIndicator.current);
    Flip.from(state, {
      duration: 0.8,
      absolute: true,
      ease: "elastic.out(1,1)",
    });
  }

  return (
    <div className="flex flex-col justify-evenly h-full border-r border-front border-opacity-20 w-max">
      {props.tabs.map((tab) => (
        <button
          onClick={(event) => {
            props.setCurrentTab(tab);
            NavigationTabSelect(event.target, tab);
          }}
          className="cursor-pointer px-10 relative"
          key={props.tabs.indexOf(tab)}
        >
          {tab}
          {props.tabs.indexOf(tab) == 0 && (
            <div
              ref={activeTabIndicator}
              className="absolute top-1/2 left-1/2 px-8 py-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary to-secondary opacity-30 -z-[1] pointer-events-none text-front text-opacity-0 whitespace-nowrap"
              // style={{ width: "max-content" }}
            >
              {tab}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

export default NavigationTabs;
