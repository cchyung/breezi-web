"use client";

import { Button } from "@/app/components/ui";
import anime from "animejs";

const WelcomeScreen = ({ onEnter }: { onEnter: () => void }) => {
  const timeline = anime.timeline({
    duration: 1000,
  });

  timeline.add(
    {
      targets: ".screen-1-text",
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(1000),
      easing: "easeOutExpo",
    },
    "+1000"
  );

  timeline.add(
    {
      targets: ".screen-1",
      opacity: [1, 0],
      duration: 1500,
      easing: "easeOutExpo",
    },
    "+4000"
  );
  timeline.add(
    {
      targets: ".screen-2",
      opacity: [0, 1],
      duration: 1500,
      easing: "easeOutExpo",
    },
    "+4000"
  );
  timeline.add(
    {
      targets: [".screen-2-logo", ".screen-2-text", ".screen-2-button"],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(200),
      easing: "easeOutExpo",
    },
    "+4800"
  );

  return (
    <div className="h-screen w-screen absolute top-0 flex justify-center items-center bg-white overflow-hidden">
      <div className="screen-1 w-full h-full flex justify-between md:justify-center items-center absolute left-0 flex-col py-24 px-8">
        <h1 className="text-[55px] screen-1-text opacity-0 text-left md:text-center">
          Everyone has lists...
        </h1>
        <h1 className="text-[55px] screen-1-text opacity-0 text-right md:text-center">
          What if they were <i>shared?</i>
        </h1>
      </div>

      <div className="flex screen-2 w-full h-full justify-center items-center absolute left-0 flex-col py-24 px-8">
        <img src="/logo/star3.png" alt="logo" className="screen-2-logo w-36" />
        <h1 className="text-[55px] screen-2-text opacity-0 mb-8">
          Welcome to Breezi
        </h1>

        <div className="flex justify-center w-full md:max-w-sm">
          <Button className="screen-2-button w-full" onClick={onEnter}>
            Enter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
