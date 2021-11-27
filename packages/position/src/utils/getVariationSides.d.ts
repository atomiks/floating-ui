import type { ElementRects, Placement, BasePlacement } from '../types';
export declare function getVariationSides(placement: Placement, rects: ElementRects): {
    main: BasePlacement;
    cross: BasePlacement;
};
