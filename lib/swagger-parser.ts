/**
 * Created by liukeyi on 18/03/2018.
 */
import { ISchema, IPath, IDefinition, ISwaggerObject, IRequestDescription, ISwaggerSchema, IDefinitionDescription, IPropertyDescription } from "./interface";
import { isNull, getType, isUndefined } from './utils';
import { DEFAULT_VALUE } from './const';

function getValue (definition: IDefinition, propertyDescription: IPropertyDescription): any {
    let result: any = null;

    if (isUndefined(propertyDescription.type) && !isNull(propertyDescription.$ref) && propertyDescription.$ref !== '') {
        result = modelCodeGenerator(definition, propertyDescription.$ref);
    } else if (propertyDescription.type === 'array') {
        /* if (propertyDescription.items) {
            result = [getValue(definition, propertyDescription.items)];
        } else {
            result = [];
        }*/
        result = [];
    } else if (!isUndefined(propertyDescription.type) && propertyDescription.type !== '') {
        result = propertyDescription.example || DEFAULT_VALUE[propertyDescription.type];
    }

    return result;
}

function modelCodeGenerator (definition: IDefinition, ref: string): object {
    const result: object = {};
    const key = ref.split('/')[2];
    const rootDefinition: IDefinitionDescription = definition[key];

    if (rootDefinition.type !== 'object') {
        return DEFAULT_VALUE[rootDefinition.type];
    }

    const properties = rootDefinition.properties;

    Object.keys(properties).forEach((key: string): void => {
        const propertyDescription: IPropertyDescription = properties[key];

        result[key] = getValue(definition, propertyDescription);
    });

    return result;
}

function getSchema (definition: IDefinition, requestDescription: IRequestDescription): object {
    let schema: ISwaggerSchema = {} as ISwaggerSchema;
    let result: object = {};

    if (requestDescription.post) {
        schema = requestDescription.post.responses['200'].schema;
    } else if (requestDescription.get) {
        schema = requestDescription.get.responses['200'].schema;
    }

    if (schema.$ref && /^#\/definitions\//.test(schema.$ref)) {
        result = modelCodeGenerator(definition, schema.$ref);
    } else {
        if (schema.type) {
            result = DEFAULT_VALUE[schema.type];
        }
    }

    return result;
}

function transformObjectToSchemaList (swaggerObject: ISwaggerObject): ISchema[] {
    const basePath = swaggerObject.basePath;
    const result: ISchema[] = [] as ISchema[];
    const paths: IPath = swaggerObject.paths;
    const definition: IDefinition = swaggerObject.definitions;

    Object.entries(paths).forEach(([path, content]) => {
        let schema: ISchema = {} as ISchema;

        schema.path = `${basePath === '/' ? '' : basePath}${path}`;
        schema.schema = getSchema(definition, content);
        console.log(schema);
        result.push(schema);
    });

    return result;
}

module.exports = function (swaggerJson: string): ISchema[] {
    if (isNull(swaggerJson) || swaggerJson === '') {
        return [];
    }

    return transformObjectToSchemaList(JSON.parse(swaggerJson));
};