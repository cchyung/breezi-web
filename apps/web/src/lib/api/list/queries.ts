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
