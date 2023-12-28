/* This file was automatically generated.  Do not edit. */
/* prettier-ignore */
/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: { input: any; output: any; }
};

export type List = {
  __typename?: 'List';
  _id: Scalars['String']['output'];
  author: User;
  comments?: Maybe<Array<ListComment>>;
  coverImageURL?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  items: Array<Maybe<ListItem>>;
  likeCount: Scalars['Int']['output'];
  likes: Array<Maybe<ListLike>>;
  state?: Maybe<ListState>;
  title: Scalars['String']['output'];
  topic?: Maybe<Topic>;
  type: ListType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ListComment = {
  __typename?: 'ListComment';
  _id: Scalars['String']['output'];
  author: User;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  text: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ListInput = {
  coverImageURL?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  items: Array<ListItemInput>;
  state?: InputMaybe<ListState>;
  title: Scalars['String']['input'];
  topic?: InputMaybe<Scalars['String']['input']>;
  type: ListType;
};

export type ListItem = {
  __typename?: 'ListItem';
  _id: Scalars['String']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Scalars['String']['output']>;
  text: Scalars['String']['output'];
};

export type ListItemInput = {
  imageURL?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
};

export type ListLike = {
  __typename?: 'ListLike';
  _id?: Maybe<Scalars['String']['output']>;
  list?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Scalars['String']['output']>;
};

export enum ListState {
  Draft = 'draft',
  Published = 'published'
}

export enum ListType {
  Bulleted = 'bulleted',
  Numbered = 'numbered'
}

export type LoginObject = {
  __typename?: 'LoginObject';
  authToken?: Maybe<Scalars['String']['output']>;
  inviteValid?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCommentToList?: Maybe<List>;
  createList?: Maybe<List>;
  createTopic?: Maybe<Topic>;
  deleteList?: Maybe<Scalars['Boolean']['output']>;
  followUser?: Maybe<User>;
  likeList?: Maybe<ListLike>;
  removeCommentFromList?: Maybe<List>;
  unfollowUser?: Maybe<User>;
  unlikeList?: Maybe<Scalars['Boolean']['output']>;
  updateList?: Maybe<List>;
  updateTopic?: Maybe<Topic>;
  updateUser?: Maybe<User>;
};


export type MutationAddCommentToListArgs = {
  listId: Scalars['String']['input'];
  text: Scalars['String']['input'];
};


export type MutationCreateListArgs = {
  list: ListInput;
};


export type MutationCreateTopicArgs = {
  topic: TopicInput;
};


export type MutationDeleteListArgs = {
  id: Scalars['String']['input'];
};


export type MutationFollowUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationLikeListArgs = {
  listId: Scalars['String']['input'];
};


export type MutationRemoveCommentFromListArgs = {
  commentId: Scalars['String']['input'];
  listId: Scalars['String']['input'];
};


export type MutationUnfollowUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationUnlikeListArgs = {
  listId: Scalars['String']['input'];
};


export type MutationUpdateListArgs = {
  id: Scalars['String']['input'];
  list: ListInput;
};


export type MutationUpdateTopicArgs = {
  id: Scalars['ID']['input'];
  topic: TopicInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  user: UpdateUserInput;
};

export type Ok = {
  __typename?: 'Ok';
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
};

export type Query = {
  __typename?: 'Query';
  list?: Maybe<List>;
  listFeed?: Maybe<Array<Maybe<List>>>;
  listLikeCount?: Maybe<Scalars['Int']['output']>;
  listLikes?: Maybe<Array<Maybe<ListLike>>>;
  lists?: Maybe<Array<Maybe<List>>>;
  /** Logs in the user based on the supplied number and verification code.  If the user doesn't exist, a new user will be created */
  loginUser?: Maybe<LoginObject>;
  sendSMSVerificationToken?: Maybe<Ok>;
  topic?: Maybe<Topic>;
  topics?: Maybe<Array<Maybe<Topic>>>;
  uploadListCoverURL?: Maybe<SignedUrl>;
  uploadUserProfileImageURL?: Maybe<SignedUrl>;
  user?: Maybe<User>;
  userLikes?: Maybe<Array<Maybe<ListLike>>>;
  userLists?: Maybe<Array<Maybe<List>>>;
  verifySMSVerificationToken?: Maybe<Ok>;
};


export type QueryListArgs = {
  id: Scalars['String']['input'];
};


export type QueryListFeedArgs = {
  cursor?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


export type QueryListLikeCountArgs = {
  listId: Scalars['String']['input'];
};


export type QueryListLikesArgs = {
  listId: Scalars['String']['input'];
};


export type QueryListsArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<ListState>;
  topic?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLoginUserArgs = {
  invitedBy?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
  verificationCode: Scalars['String']['input'];
};


export type QuerySendSmsVerificationTokenArgs = {
  invitedBy?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
};


export type QueryTopicArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTopicsArgs = {
  state?: InputMaybe<TopicState>;
};


export type QueryUserArgs = {
  authToken?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserLikesArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserListsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryVerifySmsVerificationTokenArgs = {
  code: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type SignedUrl = {
  __typename?: 'SignedURL';
  key: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Topic = {
  __typename?: 'Topic';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end?: Maybe<Scalars['DateTime']['output']>;
  start?: Maybe<Scalars['DateTime']['output']>;
  state?: Maybe<TopicState>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TopicInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<TopicState>;
  title: Scalars['String']['input'];
};

export enum TopicState {
  Ended = 'ENDED',
  Live = 'LIVE',
  Pending = 'PENDING'
}

export type UpdateUserInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  imageURL?: InputMaybe<Scalars['String']['input']>;
  registered?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  about?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  followerCount?: Maybe<Scalars['Int']['output']>;
  followers?: Maybe<Array<Maybe<UserFollower>>>;
  imageURL?: Maybe<Scalars['String']['output']>;
  likeCount?: Maybe<Scalars['Int']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  registered?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserFollower = {
  __typename?: 'UserFollower';
  _id?: Maybe<Scalars['String']['output']>;
  follower?: Maybe<User>;
  user?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  registered?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type ListFragment = { __typename?: 'List', _id: string, title: string, description?: string | null, coverImageURL?: string | null, state?: ListState | null, type: ListType, likeCount: number, createdAt?: any | null, updatedAt?: any | null, items: Array<{ __typename?: 'ListItem', _id: string, text: string, imageURL?: string | null } | null>, comments?: Array<{ __typename?: 'ListComment', _id: string, text: string, createdAt?: any | null, author: { __typename?: 'User', _id: string, username?: string | null } }> | null, author: { __typename?: 'User', _id: string, username?: string | null, imageURL?: string | null }, likes: Array<{ __typename?: 'ListLike', _id?: string | null, user?: string | null } | null>, topic?: { __typename?: 'Topic', _id: string, title?: string | null, description?: string | null } | null };

export type GetListQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetListQuery = { __typename?: 'Query', list?: { __typename?: 'List', _id: string, title: string, description?: string | null, coverImageURL?: string | null, state?: ListState | null, type: ListType, likeCount: number, createdAt?: any | null, updatedAt?: any | null, items: Array<{ __typename?: 'ListItem', _id: string, text: string, imageURL?: string | null } | null>, comments?: Array<{ __typename?: 'ListComment', _id: string, text: string, createdAt?: any | null, author: { __typename?: 'User', _id: string, username?: string | null } }> | null, author: { __typename?: 'User', _id: string, username?: string | null, imageURL?: string | null }, likes: Array<{ __typename?: 'ListLike', _id?: string | null, user?: string | null } | null>, topic?: { __typename?: 'Topic', _id: string, title?: string | null, description?: string | null } | null } | null };

export type GetListsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<ListState>;
}>;


export type GetListsQuery = { __typename?: 'Query', lists?: Array<{ __typename?: 'List', _id: string, title: string, description?: string | null, coverImageURL?: string | null, state?: ListState | null, type: ListType, likeCount: number, createdAt?: any | null, updatedAt?: any | null, items: Array<{ __typename?: 'ListItem', _id: string, text: string, imageURL?: string | null } | null>, comments?: Array<{ __typename?: 'ListComment', _id: string, text: string, createdAt?: any | null, author: { __typename?: 'User', _id: string, username?: string | null } }> | null, author: { __typename?: 'User', _id: string, username?: string | null, imageURL?: string | null }, likes: Array<{ __typename?: 'ListLike', _id?: string | null, user?: string | null } | null>, topic?: { __typename?: 'Topic', _id: string, title?: string | null, description?: string | null } | null } | null> | null };

export type GetListFeedQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetListFeedQuery = { __typename?: 'Query', listFeed?: Array<{ __typename?: 'List', _id: string, title: string, description?: string | null, coverImageURL?: string | null, state?: ListState | null, type: ListType, likeCount: number, createdAt?: any | null, updatedAt?: any | null, items: Array<{ __typename?: 'ListItem', _id: string, text: string, imageURL?: string | null } | null>, comments?: Array<{ __typename?: 'ListComment', _id: string, text: string, createdAt?: any | null, author: { __typename?: 'User', _id: string, username?: string | null } }> | null, author: { __typename?: 'User', _id: string, username?: string | null, imageURL?: string | null }, likes: Array<{ __typename?: 'ListLike', _id?: string | null, user?: string | null } | null>, topic?: { __typename?: 'Topic', _id: string, title?: string | null, description?: string | null } | null } | null> | null };

export type GetUserListsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserListsQuery = { __typename?: 'Query', userLists?: Array<{ __typename?: 'List', _id: string, title: string, description?: string | null, coverImageURL?: string | null, state?: ListState | null, type: ListType, likeCount: number, createdAt?: any | null, updatedAt?: any | null, items: Array<{ __typename?: 'ListItem', _id: string, text: string, imageURL?: string | null } | null>, comments?: Array<{ __typename?: 'ListComment', _id: string, text: string, createdAt?: any | null, author: { __typename?: 'User', _id: string, username?: string | null } }> | null, author: { __typename?: 'User', _id: string, username?: string | null, imageURL?: string | null }, likes: Array<{ __typename?: 'ListLike', _id?: string | null, user?: string | null } | null>, topic?: { __typename?: 'Topic', _id: string, title?: string | null, description?: string | null } | null } | null> | null };

export type CreateListMutationVariables = Exact<{
  list: ListInput;
}>;


export type CreateListMutation = { __typename?: 'Mutation', createList?: { __typename?: 'List', _id: string, title: string, description?: string | null, coverImageURL?: string | null, state?: ListState | null, type: ListType, likeCount: number, createdAt?: any | null, updatedAt?: any | null, items: Array<{ __typename?: 'ListItem', _id: string, text: string, imageURL?: string | null } | null>, comments?: Array<{ __typename?: 'ListComment', _id: string, text: string, createdAt?: any | null, author: { __typename?: 'User', _id: string, username?: string | null } }> | null, author: { __typename?: 'User', _id: string, username?: string | null, imageURL?: string | null }, likes: Array<{ __typename?: 'ListLike', _id?: string | null, user?: string | null } | null>, topic?: { __typename?: 'Topic', _id: string, title?: string | null, description?: string | null } | null } | null };

export type GetLikeCountQueryVariables = Exact<{
  listId: Scalars['String']['input'];
}>;


export type GetLikeCountQuery = { __typename?: 'Query', listLikeCount?: number | null };

export type LikeListMutationVariables = Exact<{
  listId: Scalars['String']['input'];
}>;


export type LikeListMutation = { __typename?: 'Mutation', likeList?: { __typename?: 'ListLike', _id?: string | null } | null };

export type UnlikeListMutationVariables = Exact<{
  listId: Scalars['String']['input'];
}>;


export type UnlikeListMutation = { __typename?: 'Mutation', unlikeList?: boolean | null };

export type UpdateListMutationVariables = Exact<{
  id: Scalars['String']['input'];
  list: ListInput;
}>;


export type UpdateListMutation = { __typename?: 'Mutation', updateList?: { __typename?: 'List', _id: string, title: string, description?: string | null, coverImageURL?: string | null, state?: ListState | null, type: ListType, likeCount: number, createdAt?: any | null, updatedAt?: any | null, items: Array<{ __typename?: 'ListItem', _id: string, text: string, imageURL?: string | null } | null>, comments?: Array<{ __typename?: 'ListComment', _id: string, text: string, createdAt?: any | null, author: { __typename?: 'User', _id: string, username?: string | null } }> | null, author: { __typename?: 'User', _id: string, username?: string | null, imageURL?: string | null }, likes: Array<{ __typename?: 'ListLike', _id?: string | null, user?: string | null } | null>, topic?: { __typename?: 'Topic', _id: string, title?: string | null, description?: string | null } | null } | null };

export type DeleteListMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteListMutation = { __typename?: 'Mutation', deleteList?: boolean | null };

export type AddCommentToListMutationVariables = Exact<{
  listId: Scalars['String']['input'];
  text: Scalars['String']['input'];
}>;


export type AddCommentToListMutation = { __typename?: 'Mutation', addCommentToList?: { __typename?: 'List', _id: string, title: string, description?: string | null, coverImageURL?: string | null, state?: ListState | null, type: ListType, likeCount: number, createdAt?: any | null, updatedAt?: any | null, items: Array<{ __typename?: 'ListItem', _id: string, text: string, imageURL?: string | null } | null>, comments?: Array<{ __typename?: 'ListComment', _id: string, text: string, createdAt?: any | null, author: { __typename?: 'User', _id: string, username?: string | null } }> | null, author: { __typename?: 'User', _id: string, username?: string | null, imageURL?: string | null }, likes: Array<{ __typename?: 'ListLike', _id?: string | null, user?: string | null } | null>, topic?: { __typename?: 'Topic', _id: string, title?: string | null, description?: string | null } | null } | null };

export type GetTopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopicsQuery = { __typename?: 'Query', topics?: Array<{ __typename?: 'Topic', _id: string, title?: string | null, description?: string | null, state?: TopicState | null, start?: any | null, end?: any | null } | null> | null };

export type GetTopicQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTopicQuery = { __typename?: 'Query', topic?: { __typename?: 'Topic', _id: string, title?: string | null, description?: string | null, state?: TopicState | null, start?: any | null, end?: any | null } | null };

export type GetUploadProfileImageUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUploadProfileImageUrlQuery = { __typename?: 'Query', uploadUserProfileImageURL?: { __typename?: 'SignedURL', url: string, key: string } | null };

export type GetUploadListCoverUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUploadListCoverUrlQuery = { __typename?: 'Query', uploadListCoverURL?: { __typename?: 'SignedURL', url: string, key: string } | null };

export type GetUserQueryVariables = Exact<{
  authToken?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, username?: string | null, imageURL?: string | null, about?: string | null, followerCount?: number | null, registered?: boolean | null, likeCount?: number | null, followers?: Array<{ __typename?: 'UserFollower', user?: string | null, follower?: { __typename?: 'User', _id: string } | null } | null> | null } | null };

export type SendSmsVerificationTokenQueryVariables = Exact<{
  phone: Scalars['String']['input'];
  invitedBy?: InputMaybe<Scalars['String']['input']>;
}>;


export type SendSmsVerificationTokenQuery = { __typename?: 'Query', sendSMSVerificationToken?: { __typename?: 'Ok', ok?: boolean | null, message?: string | null } | null };

export type LoginUserQueryVariables = Exact<{
  phone: Scalars['String']['input'];
  verificationCode: Scalars['String']['input'];
  invitedBy?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoginUserQuery = { __typename?: 'Query', loginUser?: { __typename?: 'LoginObject', authToken?: string | null, user?: { __typename?: 'User', _id: string, username?: string | null, imageURL?: string | null, about?: string | null, phone?: string | null, registered?: boolean | null, followerCount?: number | null, followers?: Array<{ __typename?: 'UserFollower', user?: string | null, follower?: { __typename?: 'User', _id: string } | null } | null> | null } | null } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
  user: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', _id: string, username?: string | null, imageURL?: string | null, about?: string | null, phone?: string | null, followerCount?: number | null, followers?: Array<{ __typename?: 'UserFollower', user?: string | null, follower?: { __typename?: 'User', _id: string } | null } | null> | null } | null };

export type FollowUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser?: { __typename?: 'User', _id: string } | null };

export type UnfollowUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser?: { __typename?: 'User', _id: string } | null };
