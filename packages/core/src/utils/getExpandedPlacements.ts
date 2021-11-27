import type {Placement} from '../types';
import {getOppositePlacement} from './getOppositePlacement';
import {getOppositeVariationPlacement} from './getOppositeVariationPlacement';

export function getExpandedPlacements(placement: Placement): Array<Placement> {
  const oppositePlacement = getOppositePlacement(placement);

  return [
    getOppositeVariationPlacement(placement),
    oppositePlacement,
    getOppositeVariationPlacement(oppositePlacement),
  ];
}
