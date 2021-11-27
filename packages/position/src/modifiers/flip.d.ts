import type { Placement, Modifier } from '../types';
import { Options as DetectOverflowOptions } from '../utils/detectOverflow';
export declare type Options = DetectOverflowOptions & {
    mainAxis: boolean;
    crossAxis: boolean;
    fallbackPlacements: Array<Placement>;
    fallbackStrategy: 'bestFit' | 'preferredPlacement';
    flipVariations: boolean;
};
export declare const flip: (options?: Partial<Options>) => Modifier;
