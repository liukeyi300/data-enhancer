"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by liukeyi on 2017/12/12.
 */
var fs = require('fs');
var path = require('path');
var toString = Object.prototype.toString;
function isSimpleType(v) {
    return ['[object Boolean]', '[object String]', '[object Number]', '[object Array]', 'object Null', 'object Undefined'].indexOf(toString.call(v)) > -1;
}
exports.isSimpleType = isSimpleType;
function isBoolean(v) {
    return '[object Boolean]' === toString.call(v);
}
exports.isBoolean = isBoolean;
function isString(v) {
    return '[object String]' === toString.call(v);
}
exports.isString = isString;
function isNumber(v) {
    return '[object Number]' === toString.call(v);
}
exports.isNumber = isNumber;
function isArray(v) {
    return '[object Array]' === toString.call(v);
}
exports.isArray = isArray;
function isNull(v) {
    return '[object Null]' === toString.call(v);
}
exports.isNull = isNull;
function isUndefined(v) {
    return '[object Undefined]' === toString.call(v);
}
exports.isUndefined = isUndefined;
function getType(v) {
    return toString.call(v);
}
exports.getType = getType;
function deleteFolder(baseDir) {
    var files = [];
    if (fs.existsSync(baseDir)) {
        files = fs.readdirSync(baseDir);
        files.forEach(function (file) {
            var curPath = baseDir + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            }
            else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(baseDir);
    }
}
exports.deleteFolder = deleteFolder;
