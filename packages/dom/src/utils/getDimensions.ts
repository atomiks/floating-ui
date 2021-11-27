import type {Dimensions} from '@floating-ui/position';

export function getDimensions(element: HTMLElement): Dimensions {
  return {
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
}
