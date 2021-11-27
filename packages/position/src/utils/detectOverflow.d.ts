import type { SideObject, Padding, ModifierArguments, Boundary, RootBoundary, Context } from '../types';
export declare type Options = {
    boundary: Boundary;
    rootBoundary: RootBoundary;
    elementContext: Context;
    altBoundary: boolean;
    padding: Padding;
};
export declare function detectOverflow(modifierArguments: ModifierArguments, options?: Partial<Options>): Promise<SideObject>;
