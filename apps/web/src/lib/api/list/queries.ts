import gql from "graphql-tag";

export const GET_LIST = gql`
  query GetList($id: String!) {
    list(id: $id) {
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
      likeCount
      likes {
        _id
        user
      }
    }
  }
`;

export const GET_LISTS = gql`
  query GetLists($cursor: Int, $pageSize: Int, $state: ListState) {
    lists(cursor: $cursor, pageSize: $pageSize, state: $state) {
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
      likeCount
      likes {
        _id
        user
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
      likeCount
      likes {
        _id
        user
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

export const GET_LIKE_COUNT = gql`
  query GetLikeCount($listId: String!) {
    listLikeCount(listId: $listId)
  }
`;

export const LIKE_LIST = gql`
  mutation LikeList($listId: String!) {
    likeList(listId: $listId) {
      _id
    }
  }
`;

export const UNLIKE_LIST = gql`
  mutation UnlikeList($listId: String!) {
    unlikeList(listId: $listId)
  }
`;
