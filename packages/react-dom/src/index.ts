import type {
  ComputePositionConfig,
  ComputePositionReturn,
} from '@floating-ui/core';
import {computePosition} from '@floating-ui/dom';
import {useCallback, useMemo, useState, useRef, MutableRefObject} from 'react';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';

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
  reference: (node: Element) => void;
  floating: (node: HTMLElement) => void;
  refs: {
    reference: MutableRefObject<Element | null>;
    floating: MutableRefObject<HTMLElement | null>;
  };
};

export function useFloating(
  options: Omit<Partial<ComputePositionConfig>, 'platform'> = {}
): UseFloatingReturn {
  const reference = useRef<Element | null>(null);
  const floating = useRef<HTMLElement | null>(null);
  const [data, setData] = useState<Data>({
    // Setting these to `null` will allow the consumer to determine if
    // `computePosition()` has run yet
    x: null,
    y: null,
    strategy: options.strategy ?? 'absolute',
    placement: 'bottom',
    middlewareData: {},
  });

  const dependencies = [
    options.placement,
    options.strategy,
    // This requires the consumer to `useMemo()` the value to prevent infinite
    // loops. We can't deep-check the array well since the API encourages
    // users to call middleware fns inline, always generating a new object.
    options.middleware,
  ];

  const update = useCallback(
    () => {
      if (!reference.current || !floating.current) {
        return;
      }

      computePosition(reference.current, floating.current, options).then(
        setData
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );

  useIsomorphicLayoutEffect(update, dependencies);

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
