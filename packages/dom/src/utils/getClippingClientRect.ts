import {
  rectToClientRect,
  ClientRectObject,
  Boundary,
  RootBoundary,
} from '@floating-ui/position';
import {getViewportRect} from './getViewportRect';
import {getDocumentRect} from './getDocumentRect';
import {getScrollParents} from './getScrollParents';
import {getOffsetParent} from './getOffsetParent';
import {getDocumentElement} from './getDocumentElement';
import {getComputedStyle} from './getComputedStyle';
import {isElement, isHTMLElement} from './is';
import {getBoundingClientRect} from './getBoundingClientRect';
import {getParentNode} from './getParentNode';
import {contains} from './contains';
import {getNodeName} from './getNodeName';

function getClientRectFromMixedType(
  element: Element,
  clippingParent: Element | RootBoundary
): ClientRectObject {
  return clippingParent === 'viewport'
    ? rectToClientRect(getViewportRect(element))
    : isHTMLElement(clippingParent)
    ? getBoundingClientRect(clippingParent)
    : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}

// A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`
function getClippingParents(element: Element): Array<Element> {
  const clippingParents = getScrollParents(getParentNode(element));
  const canEscapeClipping = ['absolute', 'fixed'].includes(
    getComputedStyle(element).position
  );
  const clipperElement =
    canEscapeClipping && isHTMLElement(element)
      ? getOffsetParent(element)
      : element;

  if (!isElement(clipperElement)) {
    return [];
  }

  // @ts-ignore isElement check ensures we return Array<Element>
  return clippingParents.filter(
    (clippingParent) =>
      isElement(clippingParent) &&
      contains(clippingParent, clipperElement) &&
      getNodeName(clippingParent) !== 'body' &&
      (canEscapeClipping
        ? getComputedStyle(clippingParent).position !== 'static'
        : true)
  );
}

// Gets the maximum area that the element is visible in due to any number of
// clipping parents
export function getClippingClientRect({
  element,
  boundary,
  rootBoundary,
}: {
  element: Element;
  boundary: Boundary;
  rootBoundary: RootBoundary;
}): ClientRectObject {
  const mainClippingParents =
    boundary === 'clippingParents'
      ? getClippingParents(element)
      : [].concat(boundary);
  const clippingParents = [...mainClippingParents, rootBoundary];
  const firstClippingParent = clippingParents[0];

  const clippingRect = clippingParents.reduce((accRect, clippingParent) => {
    const rect = getClientRectFromMixedType(element, clippingParent);

    accRect.top = Math.max(rect.top, accRect.top);
    accRect.right = Math.min(rect.right, accRect.right);
    accRect.bottom = Math.min(rect.bottom, accRect.bottom);
    accRect.left = Math.max(rect.left, accRect.left);

    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));

  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;

  return clippingRect;
}
