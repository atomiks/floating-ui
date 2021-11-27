import type {ComputePosition, Placement} from './types';
import {computeCoordsFromPlacement} from './computeCoordsFromPlacement';

export const computePosition: ComputePosition = async (
  reference,
  popper,
  config
) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    modifiers = [],
    platform,
  } = config;

  if (__DEV__) {
    if (platform == null) {
      throw new Error(
        ['@floating-ui/position: `platform` property was not passed.'].join(' ')
      );
    }

    if (
      modifiers.filter(({name}) => name === 'autoPlacement' || name === 'flip')
        .length > 1
    ) {
      throw new Error(
        [
          '@floating-ui/position: duplicate `flip` and/or `autoPlacement`',
          'modifiers detected. This will lead to an infinite loop. Ensure only',
          'one of either has been passed to the `modifiers` array.',
        ].join(' ')
      );
    }
  }

  const rects = await platform.getElementRects({reference, popper, strategy});

  let {x, y} = computeCoordsFromPlacement({...rects, placement});

  let isModifiersLifecycleReset = false;

  let statefulPlacement = placement;
  let modifiersData = {};

  const scheduleReset = ({placement}: {placement: Placement}) => {
    statefulPlacement = placement;
    isModifiersLifecycleReset = true;
  };

  let _debug_loop_count_ = 0;
  for (let i = 0; i < modifiers.length; i++) {
    if (__DEV__) {
      _debug_loop_count_++;
      if (_debug_loop_count_ > 100) {
        throw new Error(
          [
            '@floating-ui/position: The modifiers lifecycle appears to be',
            'running in an infinite loop. This is caused by a',
            '`scheduleReset()` continually being called without a break',
            'condition.',
          ].join(' ')
        );
      }
    }

    if (i === 0) {
      ({x, y} = computeCoordsFromPlacement({
        ...rects,
        placement: statefulPlacement,
      }));
    }

    const {name, fn} = modifiers[i];
    const {
      x: nextX,
      y: nextY,
      data: modifierData,
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      modifiersData,
      scheduleReset,
      rects,
      platform,
      elements: {reference, popper},
    });

    x = nextX ?? x;
    y = nextY ?? y;

    modifiersData = {...modifiersData, [name]: modifierData ?? {}};

    if (isModifiersLifecycleReset) {
      i = -1;
      isModifiersLifecycleReset = false;
      continue;
    }
  }

  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    modifiersData,
  };
};
