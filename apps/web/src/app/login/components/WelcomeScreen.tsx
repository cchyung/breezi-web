"use client";

import { Button, UserAvatar } from "@/app/components/ui";
import { User } from "@/lib/api";
import { GET_USER } from "@/lib/api/user/queries";
import { useApolloClient } from "@apollo/client";
import anime from "animejs";
import { useEffect, useState } from "react";

const WelcomeScreen = ({
  onEnter,
  invitedBy,
}: {
  onEnter: () => void;
  invitedBy?: string;
}) => {
  const client = useApolloClient();
  const timeline = anime.timeline({
    duration: 1000,
  });

  const [invitedByUser, setInvitedByUser] = useState<User>();

  useEffect(() => {
    const getInvitedByUser = async () => {
      if (invitedBy) {
        const invitedByUserQuery = await client.query({
          query: GET_USER,
          variables: {
            id: invitedBy,
          },
        });

        if (invitedByUserQuery.data?.user) {
          setInvitedByUser(invitedByUserQuery.data.user);
        }
      }
    };
    getInvitedByUser();
  }, [invitedBy]);

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
      targets: [
        ".screen-2-logo",
        ".screen-2-text",
        ".screen-2-invited-by",
        ".screen-2-button",
      ],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(200),
      easing: "easeOutExpo",
    },
    "+4800"
  );

  return (
    <div
      className="h-screen w-screen absolute top-0 flex justify-center items-center overflow-hidden bg-white"
      style={{
        backgroundImage:
          "radial-gradient(75% 75% at 40% -18%, #FFFFFF 0%, #D9E2FD 43%, #F1E8FA 100%),radial-gradient(75% 75% at 78% 78%, #F1E8FA 0%, #D9E2FD 55%, #FF83FF 100%)",
      }}
    >
      <div className="screen-1 w-full h-full flex justify-between md:justify-center items-center absolute left-0 flex-col py-24 px-8 gap-12">
        <h1 className="text-4xl md:text-6xl screen-1-text opacity-0 text-left md:text-center">
          Everyone has lists...
        </h1>
        <h1 className="text-4xl md:text-6xl screen-1-text opacity-0 text-right md:text-center">
          What if they were <i>shared?</i>
        </h1>
      </div>

      <div className="flex screen-2 w-full h-full justify-center items-center absolute left-0 flex-col py-24 px-8">
        <img src="/logo/star3.png" alt="logo" className="screen-2-logo w-36" />
        <h1 className="text-4xl md:text-6xl screen-2-text opacity-0 mb-8">
          Welcome to Breezi
        </h1>

        {invitedByUser && (
          <div className="screen-2-invited-by flex flex-col items-center gap-2 mb-8">
            <p className="text-lg italic">Invited by</p>
            <div className="flex flex-row items-center gap-2">
              <UserAvatar user={invitedByUser} size="md" />
              <p className="text-lg">{invitedByUser.username}</p>
            </div>
          </div>
        )}

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
