import { ClientRectObject, Boundary, RootBoundary } from '@floating-ui/position';
export declare function getClippingClientRect({ element, boundary, rootBoundary, }: {
    element: Element;
    boundary: Boundary;
    rootBoundary: RootBoundary;
}): ClientRectObject;
