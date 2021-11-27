import type {
  Placement,
  Modifier,
  ModifierArguments,
  Rect,
  Coords,
} from '../types';
import {getBasePlacement} from '../utils/getBasePlacement';
import {getMainAxisFromPlacement} from '../utils/getMainAxisFromPlacement';

type OffsetValue = number | {mainAxis?: number; crossAxis?: number};
type OffsetFunction = (args: {
  floating: Rect;
  reference: Rect;
  placement: Placement;
}) => OffsetValue;

export type Offset = OffsetValue | OffsetFunction;

export function convertValueToCoords({
  placement,
  rects,
  value,
}: {
  placement: Placement;
  rects: {floating: Rect; reference: Rect};
  value: Offset;
}): Coords {
  const basePlacement = getBasePlacement(placement);
  const multiplier = ['left', 'top'].includes(basePlacement) ? -1 : 1;

  const rawValue =
    typeof value === 'function' ? value({...rects, placement}) : value;
  let {mainAxis, crossAxis} =
    typeof rawValue === 'number'
      ? {mainAxis: rawValue, crossAxis: 0}
      : {mainAxis: 0, crossAxis: 0, ...rawValue};

  mainAxis = mainAxis * multiplier;
  crossAxis = crossAxis;

  return getMainAxisFromPlacement(basePlacement) === 'x'
    ? {x: crossAxis, y: mainAxis}
    : {x: mainAxis, y: crossAxis};
}

export const offset = (value: Offset): Modifier => ({
  name: 'offset',
  fn(modifierArguments: ModifierArguments) {
    const {x, y, placement, rects} = modifierArguments;
    const diffCoords = convertValueToCoords({placement, rects, value});
    return {
      x: x + diffCoords.x,
      y: y + diffCoords.y,
      data: diffCoords,
    };
  },
});
