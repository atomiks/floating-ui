import type {
  SideObject,
  Padding,
  ModifierArguments,
  Boundary,
  RootBoundary,
  Context,
} from '../types';
import {getSideObjectFromPadding} from './getPaddingObject';
import {rectToClientRect} from './rectToClientRect';

export type Options = {
  boundary: Boundary;
  rootBoundary: RootBoundary;
  elementContext: Context;
  altBoundary: boolean;
  padding: Padding;
};

export async function detectOverflow(
  modifierArguments: ModifierArguments,
  options: Partial<Options> = {}
): Promise<SideObject> {
  const {x, y, platform, rects, elements, strategy} = modifierArguments;

  const {
    boundary = 'clippingParents',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0,
  } = options;

  const paddingObject = getSideObjectFromPadding(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];

  const clippingClientRect = await platform.getClippingClientRect({
    element: (await platform.isElement(element))
      ? element
      : element.contextElement ||
        (await platform.getDocumentElement({element: elements.floating})),
    boundary,
    rootBoundary,
  });

  const elementClientRect = rectToClientRect(
    await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
      rect:
        elementContext === 'floating'
          ? {...rects.floating, x, y}
          : rects.reference,
      offsetParent: await platform.getOffsetParent({
        element: elements.floating,
      }),
      strategy,
    })
  );

  // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect
  return {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom:
      elementClientRect.bottom -
      clippingClientRect.bottom +
      paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right:
      elementClientRect.right - clippingClientRect.right + paddingObject.right,
  };
}
