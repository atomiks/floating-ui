import type {Placement, Modifier, ModifierArguments} from '../types';
import {getOppositePlacement} from '../utils/getOppositePlacement';
import {getBasePlacement} from '../utils/getBasePlacement';
import {
  detectOverflow,
  Options as DetectOverflowOptions,
} from '../utils/detectOverflow';
import {getVariationSides} from '../utils/getVariationSides';
import {getExpandedPlacements} from '../utils/getExpandedPlacements';

export type Options = DetectOverflowOptions & {
  mainAxis: boolean;
  crossAxis: boolean;
  fallbackPlacements: Array<Placement>;
  fallbackStrategy: 'bestFit' | 'preferredPlacement';
  flipVariations: boolean;
};

export const flip = (options: Partial<Options> = {}): Modifier => ({
  name: 'flip',
  async fn(modifierArguments: ModifierArguments) {
    const {placement, modifiersData, rects, scheduleReset, initialPlacement} =
      modifierArguments;

    if (modifiersData.flip?.skip) {
      return {};
    }

    const {
      mainAxis: checkMainAxis = true,
      crossAxis: checkCrossAxis = true,
      fallbackPlacements: specifiedFallbackPlacements,
      fallbackStrategy = 'bestFit',
      flipVariations = true,
      ...detectOverflowOptions
    } = options;

    const basePlacement = getBasePlacement(placement);
    const isBasePlacement = basePlacement === initialPlacement;

    const fallbackPlacements =
      specifiedFallbackPlacements ||
      (isBasePlacement || !flipVariations
        ? [getOppositePlacement(initialPlacement)]
        : getExpandedPlacements(initialPlacement));

    const placements = [initialPlacement, ...fallbackPlacements];

    const overflow = await detectOverflow(
      modifierArguments,
      detectOverflowOptions
    );

    const overflows = [];
    let overflowsData = modifiersData.flip?.overflows || [];

    if (checkMainAxis) {
      overflows.push(overflow[basePlacement]);
    }

    if (checkCrossAxis) {
      const {main, cross} = getVariationSides(placement, rects);
      overflows.push(overflow[main], overflow[cross]);
    }

    overflowsData = [...overflowsData, {placement, overflows}];

    // One or more sides is overflowing
    if (!overflows.every((side) => side <= 0)) {
      const nextIndex = (modifiersData.flip?.index ?? 0) + 1;
      const nextPlacement = placements[nextIndex];

      if (nextPlacement) {
        // Try next placement and re-run the lifecycle
        scheduleReset({placement: nextPlacement});

        return {
          data: {
            index: nextIndex,
            overflows: overflowsData,
          },
        };
      }

      switch (fallbackStrategy) {
        case 'bestFit': {
          scheduleReset({
            placement: overflowsData
              .slice()
              .sort(
                (a, b) =>
                  a.overflows
                    .filter((overflow) => overflow > 0)
                    .reduce((acc, overflow) => acc + overflow, 0) -
                  b.overflows
                    .filter((overflow) => overflow > 0)
                    .reduce((acc, overflow) => acc + overflow, 0)
              )[0].placement,
          });
          break;
        }
        case 'preferredPlacement':
          scheduleReset({placement: initialPlacement});
          break;
        default:
      }

      return {
        data: {skip: true},
      };
    }

    return {};
  },
});
