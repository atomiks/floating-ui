import type {Placement, ElementRects, Coords} from './types';
import {getBasePlacement} from './utils/getBasePlacement';
import {getVariation} from './utils/getVariation';
import {getMainAxisFromPlacement} from './utils/getMainAxisFromPlacement';
import {getLengthFromAxis} from './utils/getLengthFromAxis';

export function computeCoordsFromPlacement({
  reference,
  popper,
  placement,
}: ElementRects & {placement: Placement}): Coords {
  const commonX = reference.x + reference.width / 2 - popper.width / 2;
  const commonY = reference.y + reference.height / 2 - popper.height / 2;

  let coords;
  switch (getBasePlacement(placement)) {
    case 'top':
      coords = {x: commonX, y: reference.y - popper.height};
      break;
    case 'bottom':
      coords = {x: commonX, y: reference.y + reference.height};
      break;
    case 'right':
      coords = {x: reference.x + reference.width, y: commonY};
      break;
    case 'left':
      coords = {x: reference.x - popper.width, y: commonY};
      break;
    default:
      coords = {x: reference.x, y: reference.y};
  }

  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);

  switch (getVariation(placement)) {
    case 'start':
      coords[mainAxis] =
        coords[mainAxis] - (reference[length] / 2 - popper[length] / 2);
      break;
    case 'end':
      coords[mainAxis] =
        coords[mainAxis] + (reference[length] / 2 - popper[length] / 2);
      break;
    default:
  }

  return coords;
}
