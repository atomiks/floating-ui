import {Variation} from '../types';

export function getVariation<T extends string>(placement: T): Variation {
  return placement.split('-')[1] as Variation;
}
