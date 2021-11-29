import {computePosition} from '../src';

const reference = {};
const floating = {};
const referenceRect = {x: 0, y: 0, width: 100, height: 100};
const floatingRect = {x: 0, y: 0, width: 50, height: 50};

test('returns expected data', async () => {
  const {x, y, placement, strategy, middlewareData} = await computePosition(
    reference,
    floating,
    {
      placement: 'top',
      middleware: [{name: 'custom', fn: () => ({data: {property: true}})}],
      // @ts-ignore - computePosition() only uses this property
      platform: {
        getElementRects: () =>
          Promise.resolve({
            reference: referenceRect,
            floating: floatingRect,
          }),
      },
    }
  );

  expect(placement).toBe('top');
  expect(strategy).toBe('absolute');
  expect(x).toBe(25);
  expect(y).toBe(-50);
  expect(middlewareData).toEqual({
    custom: {
      property: true,
    },
  });
});
