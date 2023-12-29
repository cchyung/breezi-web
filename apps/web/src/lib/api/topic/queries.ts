import gql from "graphql-tag";

export const GET_TOPICS = gql`
  query GetTopics {
    topics {
      _id
      title
      description
      state
      start
      end
      style {
        color
        backgroundImageURL
        backgroundColor
      }
    }
  }
`;

export const GET_TOPIC = gql`
  query GetTopic($id: ID!) {
    topic(id: $id) {
      _id
      title
      description
      state
      start
      end
      style {
        color
        backgroundImageURL
        backgroundColor
      }
    }
  }
`;
