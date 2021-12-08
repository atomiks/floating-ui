/**
 * @jest-environment jsdom
 */
import {useFloating} from '../src';
import {renderHook} from '@testing-library/react-hooks';
import {render, waitFor} from '@testing-library/react';
import {Middleware} from '@floating-ui/core';

test('`x` and `y` are initially `null`', async () => {
  const {result} = renderHook(() => useFloating());

  expect(result.current.x).toBe(null);
  expect(result.current.y).toBe(null);
});

test('position is updated when middleware changes', async () => {
  function Component({middleware = []}: {middleware?: Middleware[]}) {
    const {x, y, reference, floating} = useFloating({
      middleware,
    });

    return (
      <>
        <div ref={reference}>reference</div>
        <div ref={floating}>floating</div>
        <div data-testid="x">{x}</div>
        <div data-testid="y">{y}</div>
      </>
    );
  }

  const {rerender, getByTestId} = render(<Component />);

  await waitFor(() => {
    expect(getByTestId('x').textContent).toBe('0');
    expect(getByTestId('y').textContent).toBe('0');
  });

  rerender(
    <Component
      middleware={[{name: 'test', fn: ({x, y}) => ({x: x + 1, y: y + 1})}]}
    />
  );

  await waitFor(() => {
    expect(getByTestId('x').textContent).toBe('1');
    expect(getByTestId('y').textContent).toBe('1');
  });
});
