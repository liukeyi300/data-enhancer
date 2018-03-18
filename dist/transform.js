"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function transformObjectToTree(originData) {
    var result = {
        properties: [],
        childNode: []
    };
    Object.keys(originData).forEach(function (key) {
        var value = originData[key];
        if (utils_1.isSimpleType(value)) {
            result.properties.push({
                key: key,
                value: value
            });
        }
        else {
            result.childNode.push({
                key: key,
                value: transformObjectToTree(value)
            });
        }
    });
    return result;
}
exports.transformObjectToTree = transformObjectToTree;
function transformTreeToObject(tree) {
    var result = {};
    return result;
}
exports.transformTreeToObject = transformTreeToObject;
