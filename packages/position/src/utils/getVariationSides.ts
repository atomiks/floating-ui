import type {ElementRects, Placement, BasePlacement} from '../types';
import {getLengthFromAxis} from './getLengthFromAxis';
import {getMainAxisFromPlacement} from './getMainAxisFromPlacement';
import {getOppositePlacement} from './getOppositePlacement';
import {getVariation} from './getVariation';

export function getVariationSides(
  placement: Placement,
  rects: ElementRects
): {
  main: BasePlacement;
  cross: BasePlacement;
} {
  const isStartVariation = getVariation(placement) === 'start';
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);

  let mainVariationSide: BasePlacement =
    mainAxis === 'x'
      ? isStartVariation
        ? 'right'
        : 'left'
      : isStartVariation
      ? 'bottom'
      : 'top';

  if (rects.reference[length] > rects.popper[length]) {
    mainVariationSide = getOppositePlacement(mainVariationSide);
  }

  return {
    main: mainVariationSide,
    cross: getOppositePlacement(mainVariationSide),
  };
}
