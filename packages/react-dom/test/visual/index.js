import {useEffect, useMemo} from 'react';
import {render} from 'react-dom';
import {useFloating, shift, flip, getScrollParents} from '../../src';

function App() {
  const {x, y, reference, floating, update} = useFloating({
    placement: 'top-end',
    middleware: useMemo(() => [flip(), shift()], []),
  });

  useEffect(() => {
    if (!reference.current || !floating.current) {
      return;
    }

    const nodes = [
      ...getScrollParents(reference.current),
      ...getScrollParents(floating.current),
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
  }, [floating, reference, update]);

  return (
    <>
      <div id="reference" ref={reference}>
        Reference
      </div>
      <div
        id="floating"
        ref={floating}
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`,
        }}
      >
        Floating
      </div>
    </>
  );
}

render(<App />, document.getElementById('root'));
