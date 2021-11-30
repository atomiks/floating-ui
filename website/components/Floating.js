import {cloneElement, useEffect, useMemo} from 'react';
import {createPortal} from 'react-dom';
import * as FloatingUI from '../../packages/react-dom';
import {getScrollParents} from '../../packages/dom';

export function Floating({
  children,
  content,
  tooltipStyle = {},
  middleware,
  portaled,
  ...options
}) {
  const {
    x,
    y,
    reference,
    floating,
    update,
    middlewareData,
    refs,
  } = FloatingUI.useFloating({
    middleware: useMemo(
      () =>
        middleware
          ?.map(({name, options}) => FloatingUI[name]?.(options))
          .filter((v) => v) ?? [],
      [middleware]
    ),
    ...options,
  });

  useEffect(() => {
    const nodes = [
      ...getScrollParents(refs.reference.current),
      ...getScrollParents(refs.floating.current),
    ];

    nodes.forEach((node) => {
      node.addEventListener('scroll', update);
      node.addEventListener('resize', update);
    });

    return () => {
      nodes.forEach((node) => {
        node.removeEventListener('scroll', update);
        node.removeEventListener('resize', update);
      });
    };
  }, [reference, floating, update, refs]);

  const tooltipJsx = (
    <div
      className="grid place-items-center bg-gray-1000 text-gray-50 z-10"
      ref={floating}
      style={{
        ...tooltipStyle,
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        maxHeight: middlewareData.size
          ? `${Math.max(
              tooltipStyle.maxHeight ?? 60,
              middlewareData.size.height
            )}px`
          : '',
        backgroundColor: middlewareData.hide?.escaped
          ? 'red'
          : '',
        visibility:
          middlewareData.hide?.referenceHidden || x == null
            ? 'hidden'
            : '',
      }}
    >
      <div className="p-4">{content ?? 'Floating'}</div>
    </div>
  );

  return (
    <>
      {cloneElement(children, {ref: reference})}
      {portaled && typeof document !== 'undefined'
        ? createPortal(
            tooltipJsx,
            document.getElementById('floating-root')
          )
        : tooltipJsx}
    </>
  );
}
