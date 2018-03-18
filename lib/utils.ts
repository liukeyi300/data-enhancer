/**
 * Created by liukeyi on 2017/12/12.
 */
const fs = require('fs');
const path = require('path');

export function isSimpleType (v: any): boolean {
    return ['[object Boolean]', '[object String]', '[object Number]', '[object Array]'].indexOf(Object.prototype.toString.call(v)) > -1;
}

export function isBoolean (v: any): boolean {
    return '[object Boolean]' === Object.prototype.toString.call(v);
}

export function isString (v: any): boolean {
    return '[object String]' === Object.prototype.toString.call(v);
}

export function isNumber (v: any): boolean {
    return '[object Number]' === Object.prototype.toString.call(v);
}

export function isArray (v: any): boolean {
    return '[object Array]' === Object.prototype.toString.call(v);
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