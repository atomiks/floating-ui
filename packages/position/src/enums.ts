import {BasePlacement} from '..';

export const basePlacements: BasePlacement[] = [
  'top',
  'right',
  'bottom',
  'left',
];
export const allPlacements = basePlacements.reduce(
  (acc, basePlacement) =>
    acc.concat(basePlacement, `${basePlacement}-start`, `${basePlacement}-end`),
  [] as any
);
