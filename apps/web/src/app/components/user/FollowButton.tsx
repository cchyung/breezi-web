"use client";
import {
  FollowUserMutation,
  FollowUserMutationVariables,
  UnfollowUserMutation,
  UnfollowUserMutationVariables,
  User,
} from "@/lib/api";
import { Button } from "@/app/components/ui";
import { useMutation } from "@apollo/client";
import { FOLLOW_USER, UNFOLLOW_USER } from "@/lib/api/user/queries";
import { useCallback, useContext } from "react";
import { UserContext } from "@/app/components/user/UserProvider";

const FollowButton = ({
  user,
  refetchUser,
}: {
  user: User;
  refetchUser: () => void;
}) => {
  const { user: loggedInUser } = useContext(UserContext);

  const [followUserMutation] = useMutation<
    FollowUserMutation,
    FollowUserMutationVariables
  >(FOLLOW_USER);

  const [unfollowMutation] = useMutation<
    UnfollowUserMutation,
    UnfollowUserMutationVariables
  >(UNFOLLOW_USER);

  const handleClick = async () => {
    if (
      user.followers?.some(
        (follower) => follower?.follower?._id === loggedInUser!._id
      )
    ) {
      await unfollowMutation({
        variables: {
          userId: user._id,
        },
      });
    } else {
      await followUserMutation({
        variables: {
          userId: user._id,
        },
      });
    }

    refetchUser();
  };

  const loggedInUserIsFollowing = useCallback(() => {
    if (!loggedInUser) return false;

    return user.followers?.some(
      (follower) => follower?.follower?._id === loggedInUser!._id
    );
  }, [user, loggedInUser]);

  return (
    <Button
      color={loggedInUserIsFollowing() ? "gray" : "black"}
      onClick={handleClick}
    >
      {loggedInUserIsFollowing() ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
