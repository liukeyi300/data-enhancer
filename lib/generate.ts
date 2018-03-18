/**
 * Created by liukeyi on 2017/12/11.
 */
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

import { IPropertyTree, IMap } from './interface';
import { transformObjectToTree } from './transform';
import { isString, isBoolean, isArray, isNumber, deleteFolder } from './utils';

const file: string = fs.readFileSync(path.resolve(__dirname, '../template/jsclass.template.ejs'), {
    encoding: 'utf-8'
});

const jsTemplate = ejs.compile(file);

function generateIndexFile (baseDir: string, tree: IPropertyTree) {
    const map = tree.properties.map((property: IMap<any>) => {
        let v = property.value;
        if (isString(v)) {
            v = `\'${v}\'`;
        } else if (isBoolean(v)) {
            v = `${v}`;
        } else if (isArray(v)) {
            v = `[${v}]`
        }

        return {
            key: property.key,
            value: v
        };
    });

    const childMap = tree.childNode.map((node: IMap<IPropertyTree>) => {
        return {
            key: node.key,
            value: node.value
        };
    });

    fs.writeFileSync(path.resolve(baseDir, './index.js'), jsTemplate({
        map,
        childMap
    }));
}

function generate (baseDir: string, tree: IPropertyTree): number {
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

    tree.childNode.forEach((node: IMap<IPropertyTree>) => {
        generate(path.resolve(baseDir, `./${node.key}`), node.value);
    });
}

module.exports = function (input: string, output: string): number {
    console.log(`inputPath: ${input}, outputPath: ${output}`);
    console.log('check file......');

    let inputFilePath: string = path.isAbsolute(input) ? input : path.resolve(process.cwd(), input);
    let outputFilePath: string = path.isAbsolute(output) ? output : path.resolve(process.cwd(), output);

    if (fs.existsSync(inputFilePath)) {
        console.log('check file success!');
        if (fs.existsSync(outputFilePath)) {
            deleteFolder(outputFilePath);
        }

        fs.mkdir(outputFilePath, function (err) {
            if (err) {
                console.log('cannot generate dir');
                console.log(err);
                return -1;
            }

            const jsonFile: string = fs.readFileSync(inputFilePath, {
                encoding: 'utf-8'
            });

            try {
                const originData: object = JSON.parse(jsonFile);
                const tree: IPropertyTree = transformObjectToTree(originData);

                return generate(outputFilePath, tree);
            } catch (e) {
                console.log(e);
                return -1;
            }
        });
    } else {
        console.log('input file isn`t exist');
        return -1;
    }
};
