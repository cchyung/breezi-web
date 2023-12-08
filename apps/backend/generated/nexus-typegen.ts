/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type * as List from "./../models/list/index"
import type * as ListLike from "./../models/listLike/index"
import type * as User from "./../models/user/index"
import type * as UserFollower from "./../models/userFollower/index"
import type { AuthenticatedContext } from "./../lib/context/index"
import type { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
    /**
     * A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    time<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Time";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
    /**
     * A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    time<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Time";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ListInput: { // input type
    coverImageURL?: string | null; // String
    description?: string | null; // String
    items: NexusGenInputs['ListItemInput'][]; // [ListItemInput!]!
    state?: NexusGenEnums['ListState'] | null; // ListState
    title: string; // String!
    type?: NexusGenEnums['ListType'] | null; // ListType
  }
  ListItemInput: { // input type
    imageURL?: string | null; // String
    parent?: string | null; // String
    text: string; // String!
  }
  UpdateUserInput: { // input type
    about?: string | null; // String
    email?: string | null; // String
    imageURL?: string | null; // String
    username?: string | null; // String
  }
  UserInput: { // input type
    _id?: string | null; // String
    phone?: string | null; // String
    username?: string | null; // String
  }
}

export interface NexusGenEnums {
  ListState: List.ListState
  ListType: List.ListType
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
  DateTime: any
  Time: any
}

export interface NexusGenObjects {
  List: List.List;
  ListComment: List.ListComment;
  ListItem: List.ListItem;
  ListLike: ListLike.ListLike;
  LoginObject: { // root type
    authToken?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Mutation: {};
  Ok: { // root type
    message?: string | null; // String
    ok?: boolean | null; // Boolean
  }
  Query: {};
  SignedURL: { // root type
    key: string; // String!
    url: string; // String!
  }
  User: User.User;
  UserFollower: UserFollower.UserFollower;
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  List: { // field return type
    _id: string; // String!
    author: NexusGenRootTypes['User']; // User!
    comments: NexusGenRootTypes['ListComment'][] | null; // [ListComment!]
    coverImageURL: string | null; // String
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    description: string | null; // String
    items: Array<NexusGenRootTypes['ListItem'] | null>; // [ListItem]!
    likeCount: number; // Int!
    likes: Array<NexusGenRootTypes['ListLike'] | null>; // [ListLike]!
    state: NexusGenEnums['ListState'] | null; // ListState
    title: string; // String!
    type: NexusGenEnums['ListType']; // ListType!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  ListComment: { // field return type
    _id: string; // String!
    author: NexusGenRootTypes['User']; // User!
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    text: string; // String!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  ListItem: { // field return type
    _id: string; // String!
    imageURL: string | null; // String
    parent: string | null; // String
    text: string; // String!
  }
  ListLike: { // field return type
    _id: string | null; // String
    list: string | null; // String
    user: string | null; // String
  }
  LoginObject: { // field return type
    authToken: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Mutation: { // field return type
    addCommentToList: NexusGenRootTypes['List'] | null; // List
    createList: NexusGenRootTypes['List'] | null; // List
    deleteList: boolean | null; // Boolean
    followUser: NexusGenRootTypes['User'] | null; // User
    likeList: NexusGenRootTypes['ListLike'] | null; // ListLike
    removeCommentFromList: NexusGenRootTypes['List'] | null; // List
    unfollowUser: NexusGenRootTypes['User'] | null; // User
    unlikeList: boolean | null; // Boolean
    updateList: NexusGenRootTypes['List'] | null; // List
    updateUser: NexusGenRootTypes['User'] | null; // User
  }
  Ok: { // field return type
    message: string | null; // String
    ok: boolean | null; // Boolean
  }
  Query: { // field return type
    list: NexusGenRootTypes['List'] | null; // List
    listLikeCount: number | null; // Int
    listLikes: Array<NexusGenRootTypes['ListLike'] | null> | null; // [ListLike]
    lists: Array<NexusGenRootTypes['List'] | null> | null; // [List]
    loginUser: NexusGenRootTypes['LoginObject'] | null; // LoginObject
    sendSMSVerificationToken: NexusGenRootTypes['Ok'] | null; // Ok
    uploadListCoverURL: NexusGenRootTypes['SignedURL'] | null; // SignedURL
    uploadUserProfileImageURL: NexusGenRootTypes['SignedURL'] | null; // SignedURL
    user: NexusGenRootTypes['User'] | null; // User
    userLikes: Array<NexusGenRootTypes['ListLike'] | null> | null; // [ListLike]
    userLists: Array<NexusGenRootTypes['List'] | null> | null; // [List]
    verifySMSVerificationToken: NexusGenRootTypes['Ok'] | null; // Ok
  }
  SignedURL: { // field return type
    key: string; // String!
    url: string; // String!
  }
  User: { // field return type
    _id: string; // String!
    about: string | null; // String
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    email: string | null; // String
    followerCount: number | null; // Int
    followers: Array<NexusGenRootTypes['UserFollower'] | null> | null; // [UserFollower]
    imageURL: string | null; // String
    phone: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    username: string | null; // String
  }
  UserFollower: { // field return type
    _id: string | null; // String
    follower: NexusGenRootTypes['User'] | null; // User
    user: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  List: { // field return type name
    _id: 'String'
    author: 'User'
    comments: 'ListComment'
    coverImageURL: 'String'
    createdAt: 'DateTime'
    description: 'String'
    items: 'ListItem'
    likeCount: 'Int'
    likes: 'ListLike'
    state: 'ListState'
    title: 'String'
    type: 'ListType'
    updatedAt: 'DateTime'
  }
  ListComment: { // field return type name
    _id: 'String'
    author: 'User'
    createdAt: 'DateTime'
    text: 'String'
    updatedAt: 'DateTime'
  }
  ListItem: { // field return type name
    _id: 'String'
    imageURL: 'String'
    parent: 'String'
    text: 'String'
  }
  ListLike: { // field return type name
    _id: 'String'
    list: 'String'
    user: 'String'
  }
  LoginObject: { // field return type name
    authToken: 'String'
    user: 'User'
  }
  Mutation: { // field return type name
    addCommentToList: 'List'
    createList: 'List'
    deleteList: 'Boolean'
    followUser: 'User'
    likeList: 'ListLike'
    removeCommentFromList: 'List'
    unfollowUser: 'User'
    unlikeList: 'Boolean'
    updateList: 'List'
    updateUser: 'User'
  }
  Ok: { // field return type name
    message: 'String'
    ok: 'Boolean'
  }
  Query: { // field return type name
    list: 'List'
    listLikeCount: 'Int'
    listLikes: 'ListLike'
    lists: 'List'
    loginUser: 'LoginObject'
    sendSMSVerificationToken: 'Ok'
    uploadListCoverURL: 'SignedURL'
    uploadUserProfileImageURL: 'SignedURL'
    user: 'User'
    userLikes: 'ListLike'
    userLists: 'List'
    verifySMSVerificationToken: 'Ok'
  }
  SignedURL: { // field return type name
    key: 'String'
    url: 'String'
  }
  User: { // field return type name
    _id: 'String'
    about: 'String'
    createdAt: 'DateTime'
    email: 'String'
    followerCount: 'Int'
    followers: 'UserFollower'
    imageURL: 'String'
    phone: 'String'
    updatedAt: 'DateTime'
    username: 'String'
  }
  UserFollower: { // field return type name
    _id: 'String'
    follower: 'User'
    user: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addCommentToList: { // args
      listId: string; // String!
      text: string; // String!
    }
    createList: { // args
      list: NexusGenInputs['ListInput']; // ListInput!
    }
    deleteList: { // args
      id: string; // String!
    }
    followUser: { // args
      userId: string; // String!
    }
    likeList: { // args
      listId: string; // String!
    }
    removeCommentFromList: { // args
      commentId: string; // String!
      listId: string; // String!
    }
    unfollowUser: { // args
      userId: string; // String!
    }
    unlikeList: { // args
      listId: string; // String!
    }
    updateList: { // args
      id: string; // String!
      list: NexusGenInputs['ListInput']; // ListInput!
    }
    updateUser: { // args
      id: string; // String!
      user: NexusGenInputs['UpdateUserInput']; // UpdateUserInput!
    }
  }
  Query: {
    list: { // args
      id: string; // String!
    }
    listLikeCount: { // args
      listId: string; // String!
    }
    listLikes: { // args
      listId: string; // String!
    }
    lists: { // args
      cursor?: number | null; // Int
      pageSize?: number | null; // Int
      state?: NexusGenEnums['ListState'] | null; // ListState
    }
    loginUser: { // args
      invitedBy?: string | null; // String
      phone: string; // String!
      verificationCode: string; // String!
    }
    sendSMSVerificationToken: { // args
      phone: string; // String!
    }
    user: { // args
      authToken?: string | null; // String
      id?: string | null; // String
    }
    userLikes: { // args
      userId?: string | null; // String
    }
    userLists: { // args
      userId?: string | null; // String
    }
    verifySMSVerificationToken: { // args
      code: string; // String!
      phone: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: AuthenticatedContext;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}