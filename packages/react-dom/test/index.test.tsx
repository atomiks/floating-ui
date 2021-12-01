/**
 * @jest-environment jsdom
 */
import {useFloating} from '../src';
import {renderHook} from '@testing-library/react-hooks';

test('`x` and `y` are initially `null`', async () => {
  const {result} = renderHook(() => useFloating());

  expect(result.current.x).toBe(null);
  expect(result.current.y).toBe(null);
});
