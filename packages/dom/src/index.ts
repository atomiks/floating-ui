import {
  computePosition as computePositionCore,
  ComputePositionConfig,
} from '@floating-ui/position';
import {platform} from './platform';

export const computePosition = (
  reference: Element,
  popper: HTMLElement,
  options: Partial<ComputePositionConfig>
) => computePositionCore(reference, popper, {platform, ...options});

export {
  arrow,
  autoPlacement,
  flip,
  hide,
  offset,
  shift,
  size,
} from '@floating-ui/position';

export {getScrollParents} from './utils/getScrollParents';
