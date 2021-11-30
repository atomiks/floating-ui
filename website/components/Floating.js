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
    function wrappedUpdate() {
      update();
      requestAnimationFrame(update);
    }

    const nodes = [
      ...getScrollParents(refs.reference.current),
      ...getScrollParents(refs.floating.current),
    ];

    nodes.forEach((node) => {
      node.addEventListener('scroll', wrappedUpdate);
      node.addEventListener('resize', wrappedUpdate);
    });

    return () => {
      nodes.forEach((node) => {
        node.removeEventListener('scroll', wrappedUpdate);
        node.removeEventListener('resize', wrappedUpdate);
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
        visibility: middlewareData.hide?.referenceHidden
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
