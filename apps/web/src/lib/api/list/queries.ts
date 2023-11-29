import gql from "graphql-tag";

export const GET_LISTS = gql`
  query GetLists($cursor: Int, $pageSize: Int) {
    lists(cursor: $cursor, pageSize: $pageSize) {
      _id
      title
      description
      coverImageURL
      state
      items {
        _id
        text
        imageURL
      }
      author {
        _id
        username
        imageURL
      }
    }
  }
`;

export const GET_USER_LISTS = gql`
  query GetUserLists($userId: String) {
    userLists(userId: $userId) {
      _id
      title
      description
      coverImageURL
      state
      items {
        _id
        text
        imageURL
      }
      author {
        _id
        username
        imageURL
      }
    }
  }
`;

export const CREATE_LIST = gql`
  mutation CreateList($list: ListInput!) {
    createList(list: $list) {
      _id
      title
      description
      coverImageURL
      state
      items {
        _id
        text
        imageURL
      }
      author {
        _id
        username
        imageURL
      }
    }
  }
`;
