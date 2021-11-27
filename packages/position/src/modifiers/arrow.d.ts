import type { Modifier, Padding } from '../types';
export declare type Options = {
    element: any;
    padding: Padding;
};
export declare const arrow: (options?: Partial<Options>) => Modifier;
