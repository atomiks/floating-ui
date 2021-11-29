import {cloneElement, useEffect} from 'react';
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
  const {x, y, reference, floating, update, middlewareData} =
    FloatingUI.useFloating({
      middleware:
        middleware
          ?.map(({name, options}) => FloatingUI[name]?.(options))
          .filter((v) => v) ?? [],
      ...options,
    });

  useEffect(() => {
    if (!reference.current || !floating.current) {
      return;
    }

    function wrappedUpdate() {
      update();
      requestAnimationFrame(update);
    }

    const nodes = [
      ...getScrollParents(reference.current),
      ...getScrollParents(floating.current),
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
  }, [reference, floating, update]);

  const tooltipJsx = (
    <div
      className="grid place-items-center bg-gray-900 text-gray-50 p-4 z-10"
      ref={floating}
      style={{
        ...tooltipStyle,
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        maxHeight: middlewareData.size
          ? `${Math.max(80, middlewareData.size.height)}px`
          : '',
        backgroundColor: middlewareData.hide?.escaped
          ? 'red'
          : '',
        visibility: middlewareData.hide?.referenceHidden
          ? 'hidden'
          : '',
      }}
    >
      {content ?? 'Floating'}
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
