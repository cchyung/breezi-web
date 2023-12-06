import gql from "graphql-tag";

export const GET_UPLOAD_PROFILE_IMAGE_URL = gql`
  query GetUploadProfileImageURL {
    uploadUserProfileImageURL {
      url
      key
    }
  }
`;

export const GET_UPLOAD_LIST_COVER_URL = gql`
  query GetUploadListCoverURL {
    uploadListCoverURL {
      url
      key
    }
  }
`;
