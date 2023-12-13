import gql from "graphql-tag";

export const GET_USER = gql`
  query GetUser($authToken: String, $id: String) {
    user(authToken: $authToken, id: $id) {
      _id
      username
      imageURL
      about
      followers {
        follower {
          _id
        }
        user
      }
      followerCount
      registered
      likeCount
    }
  }
`;

export const SEND_SMS_VERIFICATION_TOKEN = gql`
  query SendSMSVerificationToken($phone: String!) {
    sendSMSVerificationToken(phone: $phone) {
      ok
      message
    }
  }
`;

export const LOGIN_USER = gql`
  query LoginUser($phone: String!, $verificationCode: String!) {
    loginUser(phone: $phone, verificationCode: $verificationCode) {
      authToken
      user {
        _id
        username
        imageURL
        about
        phone
        followers {
          follower {
            _id
          }
          user
        }
        registered
        followerCount
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $user: UpdateUserInput!) {
    updateUser(id: $id, user: $user) {
      _id
      username
      imageURL
      about
      phone
      followers {
        follower {
          _id
        }
        user
      }
      followerCount
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($userId: String!) {
    followUser(userId: $userId) {
      _id
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($userId: String!) {
    unfollowUser(userId: $userId) {
      _id
    }
  }
`;
