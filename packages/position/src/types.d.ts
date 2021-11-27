export declare type BasePlacement = 'top' | 'right' | 'bottom' | 'left';
export declare type VariationPlacement = 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end';
export declare type AutoPlacement = 'auto' | 'auto-start' | 'auto-end';
export declare type Placement = BasePlacement | VariationPlacement;
export declare type Strategy = 'absolute' | 'fixed';
export declare type Variation = 'start' | 'end';
export declare type Axis = 'x' | 'y';
export declare type Length = 'width' | 'height';
export declare type Platform = {
    getElementRects: (args: {
        reference: Reference;
        popper: Popper;
        strategy: Strategy;
    }) => Promise<ElementRects>;
    convertOffsetParentRelativeRectToViewportRelativeRect: (args: {
        rect: Rect;
        offsetParent: Element | Window;
        strategy: Strategy;
    }) => Promise<Rect>;
    getOffsetParent: (args: {
        element: Element;
    }) => Promise<Element | Window>;
    isElement: (value: unknown) => Promise<boolean>;
    getDocumentElement: (args: {
        element: Element;
    }) => Promise<Element>;
    getClippingClientRect: (args: {
        element: Element;
        boundary: Boundary;
        rootBoundary: RootBoundary;
    }) => Promise<ClientRectObject>;
    getDimensions: (args: {
        element: HTMLElement;
    }) => Promise<Dimensions>;
};
export declare type Coords = {
    x: number;
    y: number;
};
export declare type SideObject = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
export declare type ModifiersData = {
    arrow?: {
        x?: number;
        y?: number;
        centerOffset: number;
    };
    autoPlacement?: {
        index?: number;
        skip?: boolean;
        overflows: Array<{
            placement: Placement;
            overflows: Array<number>;
        }>;
    };
    flip?: {
        index?: number;
        skip?: boolean;
        overflows: Array<{
            placement: Placement;
            overflows: Array<number>;
        }>;
    };
    hide?: {
        isReferenceHidden: boolean;
        hasPopperEscaped: boolean;
        referenceClippingOffsets: SideObject;
        popperEscapeOffsets: SideObject;
    };
    size?: Dimensions;
    [key: string]: any;
};
export declare type ComputePositionConfig = {
    platform: Platform;
    placement?: Placement;
    strategy?: Strategy;
    modifiers?: Array<Modifier>;
};
export declare type ComputePositionReturn = {
    x: number;
    y: number;
    placement: Placement;
    strategy: Strategy;
    modifiersData: ModifiersData;
};
export declare type ComputePosition = (reference: unknown, popper: unknown, config: ComputePositionConfig) => Promise<ComputePositionReturn>;
export declare type ModifierReturn = Coords & {
    data: {
        [key: string]: any;
    };
};
export declare type Modifier = {
    name: string;
    fn: (modifierArguments: ModifierArguments) => Partial<ModifierReturn> | Promise<Partial<ModifierReturn>>;
};
export declare type Dimensions = {
    width: number;
    height: number;
};
export declare type Rect = Coords & Dimensions;
export declare type ElementRects = {
    reference: Rect;
    popper: Rect;
};
export declare type Reference = any;
export declare type Popper = any;
export declare type Elements = {
    reference: Reference;
    popper: Popper;
};
export declare type ModifierArguments = Coords & {
    initialPlacement: Placement;
    placement: Placement;
    strategy: Strategy;
    modifiersData: ModifiersData;
    scheduleReset: (args: {
        placement: Placement;
    }) => void;
    elements: Elements;
    rects: ElementRects;
    platform: Platform;
};
export declare type ClientRectObject = Rect & SideObject;
export declare type Padding = number | SideObject;
export declare type Boundary = any;
export declare type RootBoundary = 'viewport' | 'document';
export declare type Context = 'reference' | 'popper';
export { computePosition } from './computePosition';
export { rectToClientRect } from './utils/rectToClientRect';
export { arrow } from './modifiers/arrow';
export { autoPlacement } from './modifiers/autoPlacement';
export { flip } from './modifiers/flip';
export { hide } from './modifiers/hide';
export { offset } from './modifiers/offset';
export { shift, limitShift } from './modifiers/shift';
export { size } from './modifiers/size';
