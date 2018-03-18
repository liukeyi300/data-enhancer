"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by liukeyi on 2017/12/12.
 */
var fs = require('fs');
var path = require('path');
function isSimpleType(v) {
    return ['[object Boolean]', '[object String]', '[object Number]', '[object Array]'].indexOf(Object.prototype.toString.call(v)) > -1;
}
exports.isSimpleType = isSimpleType;
function isBoolean(v) {
    return '[object Boolean]' === Object.prototype.toString.call(v);
}
exports.isBoolean = isBoolean;
function isString(v) {
    return '[object String]' === Object.prototype.toString.call(v);
}
exports.isString = isString;
function isNumber(v) {
    return '[object Number]' === Object.prototype.toString.call(v);
}
exports.isNumber = isNumber;
function isArray(v) {
    return '[object Array]' === Object.prototype.toString.call(v);
}
exports.isArray = isArray;
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
