import {getNodeName} from './getNodeName';
import {getWindow} from './window';

export function isHTMLElement(value: any): value is HTMLElement {
  // @ts-ignore — HTMLElement exists on Window
  return value instanceof getWindow(value).HTMLElement;
}

export function isElement(value: any): value is Element {
  // @ts-ignore — Element exists on Window
  return value instanceof getWindow(value).Element;
}

export function isNode(value: any): value is Node {
  // @ts-ignore — Node exists on Window
  return value instanceof getWindow(value).Node;
}

export function isScrollParent(element: HTMLElement): boolean {
  // Firefox wants us to check `-x` and `-y` variations as well
  const {overflow, overflowX, overflowY} = getComputedStyle(element);
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

export function isShadowRoot(node: Node): node is ShadowRoot {
  // @ts-ignore - ShadowRoot exists on Window
  const OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

export function isTableElement(element: Element): boolean {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
