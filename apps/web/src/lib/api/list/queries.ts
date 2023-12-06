import gql from "graphql-tag";
import { listFragment } from "./fragments";

export const GET_LIST = gql`
  query GetList($id: String!) {
    list(id: $id) {
      ...list
    }
  }
  ${listFragment}
`;

export const GET_LISTS = gql`
  query GetLists($cursor: Int, $pageSize: Int, $state: ListState) {
    lists(cursor: $cursor, pageSize: $pageSize, state: $state) {
      ...list
    }
  }
  ${listFragment}
`;

export const GET_USER_LISTS = gql`
  query GetUserLists($userId: String) {
    userLists(userId: $userId) {
      ...list
    }
  }
  ${listFragment}
`;

export const CREATE_LIST = gql`
  mutation CreateList($list: ListInput!) {
    createList(list: $list) {
      ...list
    }
  }
  ${listFragment}
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

export const UPDATE_LIST = gql`
  mutation UpdateList($id: String!, $list: ListInput!) {
    updateList(id: $id, list: $list) {
      ...list
    }
  }
  ${listFragment}
`;

export const DELETE_LIST = gql`
  mutation DeleteList($id: String!) {
    deleteList(id: $id)
  }
`;

export const ADD_COMMENT_TO_LIST = gql`
  mutation AddCommentToList($listId: String!, $text: String!) {
    addCommentToList(listId: $listId, text: $text) {
      ...list
    }
  }
  ${listFragment}
`;
