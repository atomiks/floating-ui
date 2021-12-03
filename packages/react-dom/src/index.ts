import type {
  ComputePositionConfig,
  ComputePositionReturn,
} from '@floating-ui/core';
import {computePosition} from '@floating-ui/dom';
import {useCallback, useMemo, useState, useRef, MutableRefObject} from 'react';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';
import {useLatestRef} from './utils/useLatestRef';

export {
  arrow,
  autoPlacement,
  flip,
  hide,
  offset,
  shift,
  limitShift,
  size,
  getScrollParents,
  detectOverflow,
} from '@floating-ui/dom';

type Data = Omit<ComputePositionReturn, 'x' | 'y'> & {
  x: number | null;
  y: number | null;
};

type UseFloatingReturn = Data & {
  update: () => void;
  reference: (node: Element | null) => void;
  floating: (node: HTMLElement | null) => void;
  refs: {
    reference: MutableRefObject<Element | null>;
    floating: MutableRefObject<HTMLElement | null>;
  };
};

export function useFloating({
  middleware,
  placement,
  strategy,
}: Omit<Partial<ComputePositionConfig>, 'platform'> = {}): UseFloatingReturn {
  const reference = useRef<Element | null>(null);
  const floating = useRef<HTMLElement | null>(null);
  const [data, setData] = useState<Data>({
    // Setting these to `null` will allow the consumer to determine if
    // `computePosition()` has run yet
    x: null,
    y: null,
    strategy: strategy ?? 'absolute',
    placement: 'bottom',
    middlewareData: {},
  });

  // Memoize middleware internally, to remove the requirement of memoization by consumer
  const latestMiddleware = useLatestRef(middleware);

  const update = useCallback(() => {
    if (!reference.current || !floating.current) {
      return;
    }

    computePosition(reference.current, floating.current, {
      middleware: latestMiddleware.current,
      placement,
      strategy,
    }).then(setData);
  }, [latestMiddleware, placement, strategy]);

  useIsomorphicLayoutEffect(update, [latestMiddleware, placement, strategy]);

  const setReference = useCallback(
    (node) => {
      reference.current = node;
      update();
    },
    [update]
  );

  const setFloating = useCallback(
    (node) => {
      floating.current = node;
      update();
    },
    [update]
  );

  return useMemo(
    () => ({
      ...data,
      update,
      reference: setReference,
      floating: setFloating,
      refs: {reference, floating},
    }),
    [data, update, setReference, setFloating]
  );
}
