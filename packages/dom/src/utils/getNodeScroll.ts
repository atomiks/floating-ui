import {NodeScroll} from '../types';
import {getWindow, isWindow} from './window';

export function getNodeScroll(element: Element | Window): NodeScroll {
  if (isWindow(element)) {
    const win = getWindow(element);
    const scrollLeft = win.pageXOffset;
    const scrollTop = win.pageYOffset;

    return {
      scrollLeft,
      scrollTop,
    };
  }

  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop,
  };
}
