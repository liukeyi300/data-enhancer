/**
 * Created by liukeyi on 2017/12/11.
 */
import { IPropertyTree } from './interface';
import { isSimpleType } from './utils';

export function transformObjectToTree (originData: object): IPropertyTree {
    let result: IPropertyTree = {
        properties: [],
        childNode: []
    };

    Object.keys(originData).forEach((key: string) => {
        const value: any = originData[key];
        if (isSimpleType(value)) {
            result.properties.push({
                key,
                value
            });
        } else {
            result.childNode.push({
                key,
                value: transformObjectToTree(value)
            });
        }
    });

    return result;
}

export function transformTreeToObject (tree: IPropertyTree): object {
    let result: object = {};

    return result;
}