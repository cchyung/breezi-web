/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type * as List from "./../models/list/index"
import type * as User from "./../models/user/index"
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
    items: NexusGenInputs['ListItemInput'][]; // [ListItemInput!]!
    state?: NexusGenEnums['ListState'] | null; // ListState
    title: string; // String!
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
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
  DateTime: any
  JSON: any
  Time: any
}

export interface NexusGenObjects {
  List: List.List;
  ListItem: List.ListItem;
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
  User: User.User;
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
    items: Array<NexusGenRootTypes['ListItem'] | null>; // [ListItem]!
    state: NexusGenEnums['ListState'] | null; // ListState
    title: string; // String!
  }
  ListItem: { // field return type
    _id: string; // String!
    imageURL: string | null; // String
    parent: string | null; // String
    text: string; // String!
  }
  LoginObject: { // field return type
    authToken: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Mutation: { // field return type
    createList: NexusGenRootTypes['List'] | null; // List
    updateUser: NexusGenRootTypes['User'] | null; // User
  }
  Ok: { // field return type
    message: string | null; // String
    ok: boolean | null; // Boolean
  }
  Query: { // field return type
    list: NexusGenRootTypes['List'] | null; // List
    loginUser: NexusGenRootTypes['LoginObject'] | null; // LoginObject
    sendSMSVerificationToken: NexusGenRootTypes['Ok'] | null; // Ok
    user: NexusGenRootTypes['User'] | null; // User
    userLists: Array<NexusGenRootTypes['List'] | null> | null; // [List]
    verifySMSVerificationToken: NexusGenRootTypes['Ok'] | null; // Ok
  }
  User: { // field return type
    _id: string; // String!
    about: string | null; // String
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    email: string | null; // String
    imageURL: string | null; // String
    phone: string; // String!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  List: { // field return type name
    _id: 'String'
    items: 'ListItem'
    state: 'ListState'
    title: 'String'
  }
  ListItem: { // field return type name
    _id: 'String'
    imageURL: 'String'
    parent: 'String'
    text: 'String'
  }
  LoginObject: { // field return type name
    authToken: 'String'
    user: 'User'
  }
  Mutation: { // field return type name
    createList: 'List'
    updateUser: 'User'
  }
  Ok: { // field return type name
    message: 'String'
    ok: 'Boolean'
  }
  Query: { // field return type name
    list: 'List'
    loginUser: 'LoginObject'
    sendSMSVerificationToken: 'Ok'
    user: 'User'
    userLists: 'List'
    verifySMSVerificationToken: 'Ok'
  }
  User: { // field return type name
    _id: 'String'
    about: 'String'
    createdAt: 'DateTime'
    email: 'String'
    imageURL: 'String'
    phone: 'String'
    updatedAt: 'DateTime'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createList: { // args
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
    loginUser: { // args
      phone: string; // String!
      verificationCode: string; // String!
    }
    sendSMSVerificationToken: { // args
      phone: string; // String!
    }
    user: { // args
      authToken?: string | null; // String
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