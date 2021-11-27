import type { Modifier, Placement, Variation } from '../types';
import { Options as DetectOverflowOptions } from '../utils/detectOverflow';
export declare type Options = DetectOverflowOptions & {
    variation: Variation | null;
    crossAxis: boolean;
    allowedPlacements: Array<Placement>;
    autoVariation: boolean;
};
export declare const autoPlacement: (options?: Partial<Options>) => Modifier;
