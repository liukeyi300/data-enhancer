"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by liukeyi on 2017/12/11.
 */
var path = require('path');
var fs = require('fs');
var ejs = require('ejs');
var transform_1 = require("./transform");
var utils_1 = require("./utils");
var file = fs.readFileSync(path.resolve(__dirname, '../template/jsclass.template.ejs'), {
    encoding: 'utf-8'
});
var jsTemplate = ejs.compile(file);
function generateIndexFile(baseDir, tree) {
    var map = tree.properties.map(function (property) {
        var v = property.value;
        if (utils_1.isString(v)) {
            v = "'" + v + "'";
        }
        else if (utils_1.isBoolean(v)) {
            v = "" + v;
        }
        else if (utils_1.isArray(v)) {
            v = "[" + v + "]";
        }
        return {
            key: property.key,
            value: v
        };
    });
    var childMap = tree.childNode.map(function (node) {
        return {
            key: node.key,
            value: node.value
        };
    });
    fs.writeFileSync(path.resolve(baseDir, './index.js'), jsTemplate({
        map: map,
        childMap: childMap
    }));
}
function generate(baseDir, tree) {
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir);
    }
    if (!fs.existsSync(baseDir)) {
        console.log('cannot generate dir!');
        return -1;
    }
    generateIndexFile(baseDir, tree);
    if (tree.childNode.length === 0) {
        return 0;
    }
    tree.childNode.forEach(function (node) {
        generate(path.resolve(baseDir, "./" + node.key), node.value);
    });
}
module.exports = function (input, output) {
    console.log("inputPath: " + input + ", outputPath: " + output);
    console.log('check file......');
    var inputFilePath = path.isAbsolute(input) ? input : path.resolve(process.cwd(), input);
    var outputFilePath = path.isAbsolute(output) ? output : path.resolve(process.cwd(), output);
    if (fs.existsSync(inputFilePath)) {
        console.log('check file success!');
        if (fs.existsSync(outputFilePath)) {
            utils_1.deleteFolder(outputFilePath);
        }
        fs.mkdir(outputFilePath, function (err) {
            if (err) {
                console.log('cannot generate dir');
                console.log(err);
                return -1;
            }
            var jsonFile = fs.readFileSync(inputFilePath, {
                encoding: 'utf-8'
            });
            try {
                var originData = JSON.parse(jsonFile);
                var tree = transform_1.transformObjectToTree(originData);
                return generate(outputFilePath, tree);
            }
            catch (e) {
                console.log(e);
                return -1;
            }
        });
    }
    else {
        console.log('input file isn`t exist');
        return -1;
    }
};
