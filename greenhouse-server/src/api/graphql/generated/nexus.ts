/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../../context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * Date custom scalar type
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "dateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * Date custom scalar type
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "dateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  PlantInput: { // input type
    description?: string | null; // String
    name: string; // String!
    position: NexusGenEnums['Position']; // Position!
  }
}

export interface NexusGenEnums {
  Position: "BOTTOM_LEFT" | "BOTTOM_RIGHT" | "GENERAL" | "MIDDLE_LEFT" | "MIDDLE_RIGHT" | "TOP_LEFT" | "TOP_RIGHT"
  Type: "HUMIDITY" | "SOIL_MOISTURE" | "TEMPERATURE"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  dateTime: any
}

export interface NexusGenObjects {
  Auth: { // root type
    errorCode?: string | null; // String
    errorMessage?: string | null; // String
    expire?: string | null; // String
    isError?: boolean | null; // Boolean
    issued?: string | null; // String
    refreshToken?: string | null; // String
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Data: { // root type
    created_at: NexusGenScalars['dateTime']; // dateTime!
    greenhouseId: string; // String!
    id: number; // Int!
    sensor: string; // String!
    updated_at: NexusGenScalars['dateTime']; // dateTime!
    value: number; // Float!
  }
  Greenhouse: { // root type
    created_at: NexusGenScalars['dateTime']; // dateTime!
    description?: string | null; // String
    id: string; // String!
    isOkay: boolean; // Boolean!
    name: string; // String!
    updated_at: NexusGenScalars['dateTime']; // dateTime!
  }
  Mutation: {};
  Plant: { // root type
    created_at: NexusGenScalars['dateTime']; // dateTime!
    description?: string | null; // String
    greenhouseId?: string | null; // String
    id: number; // Int!
    isDeleted: boolean; // Boolean!
    name: string; // String!
    position: NexusGenEnums['Position']; // Position!
    updated_at: NexusGenScalars['dateTime']; // dateTime!
  }
  Query: {};
  Sensor: { // root type
    name: string; // String!
    position: NexusGenEnums['Position']; // Position!
    type: NexusGenEnums['Type']; // Type!
  }
  SensorAuth: { // root type
    errorCode?: string | null; // String
    errorMessage?: string | null; // String
    expire?: string | null; // String
    issued?: string | null; // String
    token?: string | null; // String
  }
  User: { // root type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    surname: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Auth: { // field return type
    errorCode: string | null; // String
    errorMessage: string | null; // String
    expire: string | null; // String
    isError: boolean | null; // Boolean
    issued: string | null; // String
    refreshToken: string | null; // String
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Data: { // field return type
    created_at: NexusGenScalars['dateTime']; // dateTime!
    greenhouseId: string; // String!
    id: number; // Int!
    sensor: string; // String!
    updated_at: NexusGenScalars['dateTime']; // dateTime!
    value: number; // Float!
  }
  Greenhouse: { // field return type
    created_at: NexusGenScalars['dateTime']; // dateTime!
    description: string | null; // String
    id: string; // String!
    isOkay: boolean; // Boolean!
    name: string; // String!
    plants: Array<NexusGenRootTypes['Plant'] | null> | null; // [Plant]
    updated_at: NexusGenScalars['dateTime']; // dateTime!
  }
  Mutation: { // field return type
    addGreenhouse: NexusGenRootTypes['Greenhouse'] | null; // Greenhouse
    addPlant: NexusGenRootTypes['Plant'] | null; // Plant
    recordData: NexusGenRootTypes['Data'] | null; // Data
    registerUser: NexusGenRootTypes['Auth']; // Auth!
    removePlant: NexusGenRootTypes['Plant'] | null; // Plant
    updatePlant: NexusGenRootTypes['Plant'] | null; // Plant
  }
  Plant: { // field return type
    created_at: NexusGenScalars['dateTime']; // dateTime!
    description: string | null; // String
    greenhouseId: string | null; // String
    id: number; // Int!
    isDeleted: boolean; // Boolean!
    name: string; // String!
    position: NexusGenEnums['Position']; // Position!
    updated_at: NexusGenScalars['dateTime']; // dateTime!
  }
  Query: { // field return type
    getData: NexusGenRootTypes['Data'][] | null; // [Data!]
    getDataByPlant: NexusGenRootTypes['Data'][] | null; // [Data!]
    greenhouseAuth: NexusGenRootTypes['SensorAuth']; // SensorAuth!
    greenhouses: NexusGenRootTypes['Greenhouse'][] | null; // [Greenhouse!]
    loginUser: NexusGenRootTypes['Auth']; // Auth!
    plants: NexusGenRootTypes['Plant'][] | null; // [Plant!]
    refreshToken: NexusGenRootTypes['Auth']; // Auth!
    sensors: NexusGenRootTypes['Sensor'][] | null; // [Sensor!]
    users: NexusGenRootTypes['User'][] | null; // [User!]
  }
  Sensor: { // field return type
    name: string; // String!
    position: NexusGenEnums['Position']; // Position!
    type: NexusGenEnums['Type']; // Type!
  }
  SensorAuth: { // field return type
    errorCode: string | null; // String
    errorMessage: string | null; // String
    expire: string | null; // String
    issued: string | null; // String
    token: string | null; // String
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    surname: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Auth: { // field return type name
    errorCode: 'String'
    errorMessage: 'String'
    expire: 'String'
    isError: 'Boolean'
    issued: 'String'
    refreshToken: 'String'
    token: 'String'
    user: 'User'
  }
  Data: { // field return type name
    created_at: 'dateTime'
    greenhouseId: 'String'
    id: 'Int'
    sensor: 'String'
    updated_at: 'dateTime'
    value: 'Float'
  }
  Greenhouse: { // field return type name
    created_at: 'dateTime'
    description: 'String'
    id: 'String'
    isOkay: 'Boolean'
    name: 'String'
    plants: 'Plant'
    updated_at: 'dateTime'
  }
  Mutation: { // field return type name
    addGreenhouse: 'Greenhouse'
    addPlant: 'Plant'
    recordData: 'Data'
    registerUser: 'Auth'
    removePlant: 'Plant'
    updatePlant: 'Plant'
  }
  Plant: { // field return type name
    created_at: 'dateTime'
    description: 'String'
    greenhouseId: 'String'
    id: 'Int'
    isDeleted: 'Boolean'
    name: 'String'
    position: 'Position'
    updated_at: 'dateTime'
  }
  Query: { // field return type name
    getData: 'Data'
    getDataByPlant: 'Data'
    greenhouseAuth: 'SensorAuth'
    greenhouses: 'Greenhouse'
    loginUser: 'Auth'
    plants: 'Plant'
    refreshToken: 'Auth'
    sensors: 'Sensor'
    users: 'User'
  }
  Sensor: { // field return type name
    name: 'String'
    position: 'Position'
    type: 'Type'
  }
  SensorAuth: { // field return type name
    errorCode: 'String'
    errorMessage: 'String'
    expire: 'String'
    issued: 'String'
    token: 'String'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    name: 'String'
    surname: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addGreenhouse: { // args
      description?: string | null; // String
      name: string; // String!
    }
    addPlant: { // args
      description?: string | null; // String
      greenhouseId: string; // String!
      name: string; // String!
      position: NexusGenEnums['Position']; // Position!
    }
    recordData: { // args
      greenhouseId: string; // String!
      sensor: string; // String!
      value: number; // Float!
    }
    registerUser: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
      surname: string; // String!
    }
    removePlant: { // args
      id: number; // Int!
    }
    updatePlant: { // args
      description?: string | null; // String
      id: number; // Int!
      name: string; // String!
    }
  }
  Query: {
    getData: { // args
      greenhouseId: string; // String!
    }
    getDataByPlant: { // args
      plantId: number; // Int!
      type?: NexusGenEnums['Type'] | null; // Type
    }
    greenhouseAuth: { // args
      greenhouseId: string; // String!
    }
    loginUser: { // args
      email: string; // String!
      password: string; // String!
    }
    refreshToken: { // args
      refreshToken: string; // String!
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
  context: Context;
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
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}