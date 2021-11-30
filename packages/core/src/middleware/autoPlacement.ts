import type {
  AutoPlacement,
  Middleware,
  MiddlewareArguments,
  Placement,
  Alignment,
} from '../types';
import {
  detectOverflow,
  Options as DetectOverflowOptions,
} from '../detectOverflow';
import {getBasePlacement} from '../utils/getBasePlacement';
import {getAlignment} from '../utils/getAlignment';
import {getAlignmentSides} from '../utils/getAlignmentSides';
import {getOppositeAlignmentPlacement} from '../utils/getOppositeAlignmentPlacement';
import {allPlacements, basePlacements} from '../enums';

function convertAutoPlacementToComputedPlacements(
  placement: AutoPlacement,
  allowedPlacements: Array<Placement>
) {
  const alignment = getAlignment(placement);

  if (!alignment) {
    return basePlacements.filter((placement) =>
      allowedPlacements.includes(placement)
    );
  }

  return allowedPlacements.filter(
    (placement) => getAlignment(placement) === alignment
  );
}

export type Options = DetectOverflowOptions & {
  alignment: Alignment | null;
  crossAxis: boolean;
  allowedPlacements: Array<Placement>;
  autoAlignment: boolean;
};

export const autoPlacement = (options: Partial<Options> = {}): Middleware => ({
  name: 'autoPlacement',
  async fn(middlewareArguments: MiddlewareArguments) {
    const {x, y, rects, middlewareData, placement} = middlewareArguments;

    const {
      alignment = null,
      crossAxis = false,
      allowedPlacements = allPlacements,
      autoAlignment = true,
      ...detectOverflowOptions
    } = options;

    if (middlewareData.autoPlacement?.skip) {
      return {};
    }

    const autoPlacement = ('auto' +
      (alignment != null ? `-${alignment}` : '')) as AutoPlacement;

    let placements = convertAutoPlacementToComputedPlacements(
      autoPlacement,
      allowedPlacements
    );

    if (autoAlignment) {
      placements = placements.reduce((acc, placement) => {
        return acc.concat(
          getAlignment(placement)
            ? [placement, getOppositeAlignmentPlacement(placement)]
            : placement
        );
      }, [] as any);
    }

    const overflow = await detectOverflow(
      middlewareArguments,
      detectOverflowOptions
    );

    const currentIndex = middlewareData.autoPlacement?.index ?? 0;
    const currentPlacement = placements[currentIndex];
    const {main, cross} = getAlignmentSides(currentPlacement, rects);

    // Make `computeCoords` start from the right place
    if (placement !== currentPlacement) {
      return {
        x,
        y,
        reset: {
          placement: placements[0],
        },
      };
    }

    const currentOverflows = [
      overflow[getBasePlacement(currentPlacement)],
      overflow[main],
      overflow[cross],
    ];

    const allOverflows = [
      ...(middlewareData.autoPlacement?.overflows ?? []),
      {placement: currentPlacement, overflows: currentOverflows},
    ];

    const nextPlacement = placements[currentIndex + 1];

    // There are more placements to check
    if (nextPlacement) {
      return {
        data: {
          index: currentIndex + 1,
          overflows: allOverflows,
        },
        reset: {
          placement: nextPlacement,
        },
      };
    }

    const placementsSortedByLeastOverflow = allOverflows
      .slice()
      .sort(
        crossAxis || (autoAlignment && getAlignment(placement))
          ? (a, b) =>
              a.overflows.reduce((acc, overflow) => acc + overflow, 0) -
              b.overflows.reduce((acc, overflow) => acc + overflow, 0)
          : (a, b) => a.overflows[0] - b.overflows[0]
      );
    const placementThatFitsOnAllSides = placementsSortedByLeastOverflow.find(
      ({overflows}) => overflows.every((overflow) => overflow <= 0)
    )?.placement;

    return {
      data: {
        skip: true,
      },
      reset: {
        placement:
          placementThatFitsOnAllSides ??
          placementsSortedByLeastOverflow[0].placement,
      },
    };
  },
});
