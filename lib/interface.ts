/**
 * Created by liukeyi on 2017/12/11.
 */

export interface IMap<T> {
    key: string;
    value: T
}

export interface IPropertyTree {
    properties: IMap<any>[];
    childNode: IMap<IPropertyTree>[];
}

export interface ISchema {
    path: string,
    schema: object
}

export interface ISwaggerTagDescription {
    name: string;
    description: string;
}

export interface ISwaggerSchema {
    $ref?: string;
    type?: string;
    items?: ISwaggerSchema;
    additionalProperties?: ISwaggerSchema;
}

export interface IResponse {
    '200': {
        description: string;
        schema: ISwaggerSchema
    },
    '401': {
        description: string;
    },
    '403': {
        description: string;
    },
    404: {
        description: string;
    }
}

export interface IPropertyDescription {
    type?: string;
    format?: string;
    example?: any;
    description?: string;
    $ref?: string;
    items?: IPropertyDescription;
}

export interface IRequestDescription {
    [key: string]: {
        tags: string[];
        summary: string;
        consumes: string[];
        produces: string[];
        responses: IResponse
    };
}

export interface IDefinitionDescription {
    type: string;
    properties: {
        [key: string]: IPropertyDescription
    }
}

export interface IPath {
    [key: string]: IRequestDescription;
}

export interface IDefinition {
    [key: string]: IDefinitionDescription;
}

export interface ISwaggerObject {
    swagger: string;
    info: {
        description: string;
        version: string;
        title: string;
        termsOfService: string;
        contact: {
            name: string
        };
    };
    host: string;
    basePath: string;
    tags: ISwaggerTagDescription[];
    paths: IPath;
    definitions: IDefinition
}
