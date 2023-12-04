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
  JSON: { input: any; output: any; }
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: { input: any; output: any; }
};

export type List = {
  __typename?: 'List';
  _id: Scalars['String']['output'];
  author: User;
  coverImageURL?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  items: Array<Maybe<ListItem>>;
  likeCount: Scalars['Int']['output'];
  likes: Array<Maybe<ListLike>>;
  state?: Maybe<ListState>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ListInput = {
  coverImageURL?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  items: Array<ListItemInput>;
  state?: InputMaybe<ListState>;
  title: Scalars['String']['input'];
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

export type LoginObject = {
  __typename?: 'LoginObject';
  authToken?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createList?: Maybe<List>;
  likeList?: Maybe<ListLike>;
  unlikeList?: Maybe<Scalars['Boolean']['output']>;
  updateUser?: Maybe<User>;
};


export type MutationCreateListArgs = {
  list: ListInput;
};


export type MutationLikeListArgs = {
  listId: Scalars['String']['input'];
};


export type MutationUnlikeListArgs = {
  listId: Scalars['String']['input'];
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
  listLikeCount?: Maybe<Scalars['Int']['output']>;
  listLikes?: Maybe<Array<Maybe<ListLike>>>;
  lists?: Maybe<Array<Maybe<List>>>;
  /** Logs in the user based on the supplied number and verification code.  If the user doesn't exist, a new user will be created */
  loginUser?: Maybe<LoginObject>;
  sendSMSVerificationToken?: Maybe<Ok>;
  user?: Maybe<User>;
  userLikes?: Maybe<Array<Maybe<ListLike>>>;
  userLists?: Maybe<Array<Maybe<List>>>;
  verifySMSVerificationToken?: Maybe<Ok>;
};


export type QueryListArgs = {
  id: Scalars['String']['input'];
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
};


export type QueryLoginUserArgs = {
  phone: Scalars['String']['input'];
  verificationCode: Scalars['String']['input'];
};


export type QuerySendSmsVerificationTokenArgs = {
  phone: Scalars['String']['input'];
};


export type QueryUserArgs = {
  authToken?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserLikesArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserListsArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryVerifySmsVerificationTokenArgs = {
  code: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type UpdateUserInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  imageURL?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  about?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  imageURL?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type GetListQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetListQuery = { __typename?: 'Query', list?: { __typename?: 'List', _id: string, title: string, description?: string | null, coverImageURL?: string | null, state?: ListState | null, likeCount: number, items: Array<{ __typename?: 'ListItem', _id: string, text: string, imageURL?: string | null } | null>, author: { __typename?: 'User', _id: string, username?: string | null, imageURL?: string | null }, likes: Array<{ __typename?: 'ListLike', _id?: string | null, user?: string | null } | null> } | null };

export type GetListsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<ListState>;
}>;


export type GetListsQuery = { __typename?: 'Query', lists?: Array<{ __typename?: 'List', _id: string, title: string, description?: string | null, coverImageURL?: string | null, state?: ListState | null, likeCount: number, items: Array<{ __typename?: 'ListItem', _id: string, text: string, imageURL?: string | null } | null>, author: { __typename?: 'User', _id: string, username?: string | null, imageURL?: string | null }, likes: Array<{ __typename?: 'ListLike', _id?: string | null, user?: string | null } | null> } | null> | null };

export type GetUserListsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserListsQuery = { __typename?: 'Query', userLists?: Array<{ __typename?: 'List', _id: string, title: string, description?: string | null, coverImageURL?: string | null, state?: ListState | null, likeCount: number, items: Array<{ __typename?: 'ListItem', _id: string, text: string, imageURL?: string | null } | null>, author: { __typename?: 'User', _id: string, username?: string | null, imageURL?: string | null }, likes: Array<{ __typename?: 'ListLike', _id?: string | null, user?: string | null } | null> } | null> | null };

export type CreateListMutationVariables = Exact<{
  list: ListInput;
}>;


export type CreateListMutation = { __typename?: 'Mutation', createList?: { __typename?: 'List', _id: string, title: string, description?: string | null, coverImageURL?: string | null, state?: ListState | null, likeCount: number, items: Array<{ __typename?: 'ListItem', _id: string, text: string, imageURL?: string | null } | null>, author: { __typename?: 'User', _id: string, username?: string | null, imageURL?: string | null }, likes: Array<{ __typename?: 'ListLike', _id?: string | null, user?: string | null } | null> } | null };

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

export type GetUserQueryVariables = Exact<{
  authToken?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, username?: string | null, imageURL?: string | null, about?: string | null } | null };

export type SendSmsVerificationTokenQueryVariables = Exact<{
  phone: Scalars['String']['input'];
}>;


export type SendSmsVerificationTokenQuery = { __typename?: 'Query', sendSMSVerificationToken?: { __typename?: 'Ok', ok?: boolean | null, message?: string | null } | null };

export type LoginUserQueryVariables = Exact<{
  phone: Scalars['String']['input'];
  verificationCode: Scalars['String']['input'];
}>;


export type LoginUserQuery = { __typename?: 'Query', loginUser?: { __typename?: 'LoginObject', authToken?: string | null, user?: { __typename?: 'User', _id: string, phone?: string | null } | null } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
  user: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', _id: string } | null };
