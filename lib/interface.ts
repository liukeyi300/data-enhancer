/**
 * Created by liukeyi on 2017/12/11.
 */
export interface IMap<T> {
    key: string;
    value: T
}

export interface IPropertyTree {
    properties: IMap<any>[];
    childNode: IMap<IPropertyTree>[];
}