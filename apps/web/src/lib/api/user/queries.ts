import gql from "graphql-tag";

export const GET_USER = gql`
  query GetUser($authToken: String!) {
    user(authToken: $authToken) {
      _id
    }
  }
`;