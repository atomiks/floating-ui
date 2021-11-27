import type { Modifier, Rect, Placement, ModifierArguments, Coords } from '../types';
import { Options as DetectOverflowOptions } from '../utils/detectOverflow';
declare type Options = DetectOverflowOptions & {
    mainAxis: boolean;
    crossAxis: boolean;
    limiter: (modifierArguments: ModifierArguments) => Coords;
};
export declare const shift: (options?: Partial<Options>) => Modifier;
declare type LimitShiftOffset = ((args: {
    placement: Placement;
    popper: Rect;
    reference: Rect;
}) => number) | number;
export declare type LimitShiftOptions = {
    offset: LimitShiftOffset;
    mainAxis: boolean;
    crossAxis: boolean;
};
export declare const limitShift: (options?: Partial<LimitShiftOptions>) => (modifierArguments: ModifierArguments) => void;
export {};
