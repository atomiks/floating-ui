import type { Placement, ElementRects, Coords } from './types';
export declare function computeCoordsFromPlacement({ reference, popper, placement, }: ElementRects & {
    placement: Placement;
}): Coords;
