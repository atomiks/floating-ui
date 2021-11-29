import type {ComputePosition, Placement} from './types';
import {computeCoordsFromPlacement} from './computeCoordsFromPlacement';

export const computePosition: ComputePosition = async (
  reference,
  floating,
  config
) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform,
  } = config;

  if (__DEV__) {
    if (platform == null) {
      throw new Error(
        ['Floating UI Core: `platform` property was not passed.'].join(' ')
      );
    }

    if (
      middleware.filter(({name}) => name === 'autoPlacement' || name === 'flip')
        .length > 1
    ) {
      throw new Error(
        [
          'Floating UI: duplicate `flip` and/or `autoPlacement`',
          'middleware detected. This will lead to an infinite loop. Ensure only',
          'one of either has been passed to the `middleware` array.',
        ].join(' ')
      );
    }
  }

  const rects = await platform.getElementRects({reference, floating, strategy});

  let {x, y} = computeCoordsFromPlacement({...rects, placement});

  let isMiddlewareLifecycleReset = false;

  let statefulPlacement = placement;
  let middlewareData = {};

  const scheduleReset = ({placement}: {placement: Placement}) => {
    statefulPlacement = placement;
    isMiddlewareLifecycleReset = true;
  };

  let _debug_loop_count_ = 0;
  for (let i = 0; i < middleware.length; i++) {
    if (__DEV__) {
      _debug_loop_count_++;
      if (_debug_loop_count_ > 100) {
        throw new Error(
          [
            'Floating UI: The middleware lifecycle appears to be',
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

    const {name, fn} = middleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      scheduleReset,
      rects,
      platform,
      elements: {reference, floating},
    });

    x = nextX ?? x;
    y = nextY ?? y;

    middlewareData = {...middlewareData, [name]: data ?? {}};

    if (isMiddlewareLifecycleReset) {
      i = -1;
      isMiddlewareLifecycleReset = false;
      continue;
    }
  }

  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData,
  };
};
