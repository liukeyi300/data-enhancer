/**
 * Created by liukeyi on 2017/12/12.
 */
const fs = require('fs');
const path = require('path');

const toString: Function = Object.prototype.toString;

export function isSimpleType (v: any): boolean {
    return ['[object Boolean]', '[object String]', '[object Number]', '[object Array]', 'object Null', 'object Undefined'].indexOf(toString.call(v)) > -1;
}

export function isBoolean (v: any): boolean {
    return '[object Boolean]' === toString.call(v);
}

export function isString (v: any): boolean {
    return '[object String]' === toString.call(v);
}

export function isNumber (v: any): boolean {
    return '[object Number]' === toString.call(v);
}

export function isArray (v: any): boolean {
    return '[object Array]' === toString.call(v);
}

export function isNull (v: any): boolean {
    return '[object Null]' === toString.call(v);
}

export function isUndefined (v: any): boolean {
    return '[object Undefined]' === toString.call(v);
}

export function getType (v: any): string {
    return toString.call(v);
}

export function deleteFolder (baseDir: string) {
    let files = [];

    if (fs.existsSync(baseDir)) {
        files = fs.readdirSync(baseDir);

        files.forEach((file) => {
            const curPath = baseDir + "/" + file;

            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });

        fs.rmdirSync(baseDir);
    }
}