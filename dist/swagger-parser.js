"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var const_1 = require("./const");
function getValue(definition, propertyDescription) {
    var result = null;
    if (utils_1.isUndefined(propertyDescription.type) && !utils_1.isNull(propertyDescription.$ref) && propertyDescription.$ref !== '') {
        result = modelCodeGenerator(definition, propertyDescription.$ref);
    }
    else if (propertyDescription.type === 'array') {
        /* if (propertyDescription.items) {
            result = [getValue(definition, propertyDescription.items)];
        } else {
            result = [];
        }*/
        result = [];
    }
    else if (!utils_1.isUndefined(propertyDescription.type) && propertyDescription.type !== '') {
        result = propertyDescription.example || const_1.DEFAULT_VALUE[propertyDescription.type];
    }
    return result;
}
function modelCodeGenerator(definition, ref) {
    var result = {};
    var key = ref.split('/')[2];
    var rootDefinition = definition[key];
    if (rootDefinition.type !== 'object') {
        return const_1.DEFAULT_VALUE[rootDefinition.type];
    }
    var properties = rootDefinition.properties;
    Object.keys(properties).forEach(function (key) {
        var propertyDescription = properties[key];
        result[key] = getValue(definition, propertyDescription);
    });
    return result;
}
function getSchema(definition, requestDescription) {
    var schema = {};
    var result = {};
    if (requestDescription.post) {
        schema = requestDescription.post.responses['200'].schema;
    }
    else if (requestDescription.get) {
        schema = requestDescription.get.responses['200'].schema;
    }
    if (schema.$ref && /^#\/definitions\//.test(schema.$ref)) {
        result = modelCodeGenerator(definition, schema.$ref);
    }
    else {
        if (schema.type) {
            result = const_1.DEFAULT_VALUE[schema.type];
        }
    }
    return result;
}
function transformObjectToSchemaList(swaggerObject) {
    var basePath = swaggerObject.basePath;
    var result = [];
    var paths = swaggerObject.paths;
    var definition = swaggerObject.definitions;
    Object.entries(paths).forEach(function (_a) {
        var path = _a[0], content = _a[1];
        var schema = {};
        schema.path = "" + (basePath === '/' ? '' : basePath) + path;
        schema.schema = getSchema(definition, content);
        console.log(schema);
        result.push(schema);
    });
    return result;
}
module.exports = function (swaggerJson) {
    if (utils_1.isNull(swaggerJson) || swaggerJson === '') {
        return [];
    }
    return transformObjectToSchemaList(JSON.parse(swaggerJson));
};
