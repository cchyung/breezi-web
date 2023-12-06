import { gql } from "graphql-tag";

export const listFragment = gql`
  fragment list on List {
    _id
    title
    description
    coverImageURL
    state
    type
    items {
      _id
      text
      imageURL
    }
    comments {
      _id
      text
      author {
        _id
        username
      }
      createdAt
    }
    author {
      _id
      username
      imageURL
    }
    likeCount
    likes {
      _id
      user
    }
    createdAt
    updatedAt
  }
`;
