import type { Rect, Strategy } from '@floating-ui/position';
export declare function convertOffsetParentRelativeRectToViewportRelativeRect({ rect, offsetParent, strategy, }: {
    rect: Rect;
    offsetParent: Element | Window;
    strategy: Strategy;
}): Rect;
