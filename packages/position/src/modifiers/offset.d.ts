import type { Placement, Modifier, Rect, Coords } from '../types';
declare type OffsetValue = number | {
    mainAxis?: number;
    crossAxis?: number;
};
declare type OffsetFunction = (args: {
    popper: Rect;
    reference: Rect;
    placement: Placement;
}) => OffsetValue;
export declare type Offset = OffsetValue | OffsetFunction;
export declare function convertValueToCoords({ placement, rects, value, }: {
    placement: Placement;
    rects: {
        popper: Rect;
        reference: Rect;
    };
    value: Offset;
}): Coords;
export declare const offset: (value: Offset) => Modifier;
export {};
