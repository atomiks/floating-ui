import type {
  AutoPlacement,
  Modifier,
  ModifierArguments,
  Placement,
  Variation,
} from '../types';
import {
  detectOverflow,
  Options as DetectOverflowOptions,
} from '../utils/detectOverflow';
import {getBasePlacement} from '../utils/getBasePlacement';
import {getVariation} from '../utils/getVariation';
import {getVariationSides} from '../utils/getVariationSides';
import {getOppositeVariationPlacement} from '../utils/getOppositeVariationPlacement';
import {allPlacements, basePlacements} from '../enums';

function convertAutoPlacementToComputedPlacements(
  placement: AutoPlacement,
  allowedPlacements: Array<Placement>
) {
  const variation = getVariation(placement);

  if (!variation) {
    return basePlacements.filter((placement) =>
      allowedPlacements.includes(placement)
    );
  }

  return allowedPlacements.filter(
    (placement) => getVariation(placement) === variation
  );
}

export type Options = DetectOverflowOptions & {
  variation: Variation | null;
  crossAxis: boolean;
  allowedPlacements: Array<Placement>;
  autoVariation: boolean;
};

export const autoPlacement = (options: Partial<Options> = {}): Modifier => ({
  name: 'autoPlacement',
  async fn(modifierArguments: ModifierArguments) {
    const {x, y, rects, scheduleReset, modifiersData, placement} =
      modifierArguments;

    const {
      variation = null,
      crossAxis = false,
      allowedPlacements = allPlacements,
      autoVariation = true,
      ...detectOverflowOptions
    } = options;

    if (modifiersData.autoPlacement?.skip) {
      return {};
    }

    const autoPlacement = ('auto' +
      (variation != null ? `-${variation}` : '')) as AutoPlacement;

    let placements = convertAutoPlacementToComputedPlacements(
      autoPlacement,
      allowedPlacements
    );

    if (autoVariation) {
      placements = placements.reduce((acc, placement) => {
        return acc.concat(
          getVariation(placement)
            ? [placement, getOppositeVariationPlacement(placement)]
            : placement
        );
      }, [] as any);
    }

    const overflow = await detectOverflow(
      modifierArguments,
      detectOverflowOptions
    );

    const currentIndex = modifiersData.autoPlacement?.index ?? 0;
    const currentPlacement = placements[currentIndex];
    const {main, cross} = getVariationSides(currentPlacement, rects);

    // Make `computeCoords` start from the right place
    if (placement !== currentPlacement) {
      scheduleReset({placement: placements[0]});
      return {x, y};
    }

    const currentOverflows = [
      overflow[getBasePlacement(currentPlacement)],
      overflow[main],
      overflow[cross],
    ];

    const allOverflows = [
      ...(modifiersData.autoPlacement?.overflows ?? []),
      {placement: currentPlacement, overflows: currentOverflows},
    ];

    const nextPlacement = placements[currentIndex + 1];

    // There are more placements to check
    if (nextPlacement) {
      scheduleReset({placement: nextPlacement});

      return {
        data: {
          index: currentIndex + 1,
          overflows: allOverflows,
        },
      };
    }

    const placementsSortedByLeastOverflow = allOverflows
      .slice()
      .sort(
        crossAxis || (autoVariation && getVariation(placement))
          ? (a, b) =>
              a.overflows.reduce((acc, overflow) => acc + overflow, 0) -
              b.overflows.reduce((acc, overflow) => acc + overflow, 0)
          : (a, b) => a.overflows[0] - b.overflows[0]
      );
    const placementThatFitsOnAllSides = placementsSortedByLeastOverflow.find(
      ({overflows}) => overflows.every((overflow) => overflow <= 0)
    )?.placement;

    scheduleReset({
      placement:
        placementThatFitsOnAllSides ??
        placementsSortedByLeastOverflow[0].placement,
    });

    return {
      data: {skip: true},
    };
  },
});
