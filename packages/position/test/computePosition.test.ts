import {computePosition} from '../src';

const reference = {};
const popper = {};
const referenceRect = {x: 0, y: 0, width: 100, height: 100};
const popperRect = {x: 0, y: 0, width: 50, height: 50};

test('returns expected data', async () => {
  const {x, y, placement, strategy, modifiersData} = await computePosition(
    reference,
    popper,
    {
      placement: 'top',
      modifiers: [{name: 'custom', fn: () => ({data: {property: true}})}],
      // @ts-ignore - computePosition() only uses this property
      platform: {
        getElementRects: () =>
          Promise.resolve({
            reference: referenceRect,
            popper: popperRect,
          }),
      },
    }
  );

  expect(placement).toBe('top');
  expect(strategy).toBe('absolute');
  expect(x).toBe(25);
  expect(y).toBe(-50);
  expect(modifiersData).toEqual({
    custom: {
      property: true,
    },
  });
});
