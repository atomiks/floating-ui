import {getScrollParents} from './dist/index.mjs';

export function position(data) {
  Object.assign(popper.style, {
    position: data.strategy,
    left: `${data.x}px`,
    top: `${data.y}px`,
    opacity: data.modifiersData.hide?.hasPopperEscaped ? '0.5' : '1',
    visibility: data.modifiersData.hide?.isReferenceHidden
      ? 'hidden'
      : 'visible',
  });

  if (window.arrowElement) {
    Object.assign(arrowElement.style, {
      position: 'absolute',
      left:
        data.modifiersData.arrow?.x != null
          ? `${data.modifiersData.arrow?.x}px`
          : '',
      top:
        data.modifiersData.arrow?.y != null
          ? `${data.modifiersData.arrow?.y}px`
          : '',
      [{top: 'bottom', bottom: 'top', left: 'right', right: 'left'}[
        data.placement.split('-')[0]
      ]]: `-${arrowElement.getBoundingClientRect().height}px`,
      opacity: data.modifiersData.arrow?.centerOffset !== 0 ? '0.5' : '1',
    });
  }
}

export function updateOnScroll(callback) {
  [...getScrollParents(reference), ...getScrollParents(popper)].forEach(
    (element) => {
      element.addEventListener('scroll', callback);
    }
  );

  callback();
}
