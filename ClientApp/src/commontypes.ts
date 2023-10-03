export interface KeyOfString<T> {
    [key: string]: T;
}

export type Entities<T> = KeyOfString<T>;

export type F<R = any> = () => R;
export type F1<A1, R = any> = (a1: A1) => R;
export type F2<A1, A2, R = any> = (a1: A1, a2: A2) => R;
export type F3<A1, A2, A3, R = any> = (a1: A1, a2: A2, a3: A3) => R;
export type Fn<R> = (...args: any[]) => R;

export type Dictionary<T> = {
    [Key: string]: T;
};