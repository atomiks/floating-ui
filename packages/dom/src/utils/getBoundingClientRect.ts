import type {ClientRectObject} from '@floating-ui/core';

export function getBoundingClientRect(element: Element): ClientRectObject {
  const clientRect = element.getBoundingClientRect();
  return {
    width: clientRect.width,
    height: clientRect.height,
    top: clientRect.top,
    right: clientRect.right,
    bottom: clientRect.bottom,
    left: clientRect.left,
    x: clientRect.left,
    y: clientRect.top,
  };
}
