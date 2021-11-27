import {computeCoordsFromPlacement} from '../src/computeCoordsFromPlacement';

const reference = {x: 0, y: 0, width: 100, height: 100};
const popper = {x: 0, y: 0, width: 50, height: 50};

test('bottom', () => {
  expect(
    computeCoordsFromPlacement({reference, popper, placement: 'bottom'})
  ).toEqual({x: 25, y: 100});
});

test('bottom-start', () => {
  expect(
    computeCoordsFromPlacement({reference, popper, placement: 'bottom-start'})
  ).toEqual({x: 0, y: 100});
});

test('bottom-end', () => {
  expect(
    computeCoordsFromPlacement({reference, popper, placement: 'bottom-end'})
  ).toEqual({x: 50, y: 100});
});

test('top', () => {
  expect(
    computeCoordsFromPlacement({reference, popper, placement: 'top'})
  ).toEqual({x: 25, y: -50});
});

test('top-start', () => {
  expect(
    computeCoordsFromPlacement({reference, popper, placement: 'top-start'})
  ).toEqual({x: 0, y: -50});
});

test('top-end', () => {
  expect(
    computeCoordsFromPlacement({reference, popper, placement: 'top-end'})
  ).toEqual({x: 50, y: -50});
});

test('right', () => {
  expect(
    computeCoordsFromPlacement({reference, popper, placement: 'right'})
  ).toEqual({x: 100, y: 25});
});

test('right-start', () => {
  expect(
    computeCoordsFromPlacement({reference, popper, placement: 'right-start'})
  ).toEqual({x: 100, y: 0});
});

test('right-end', () => {
  expect(
    computeCoordsFromPlacement({reference, popper, placement: 'right-end'})
  ).toEqual({x: 100, y: 50});
});

test('left', () => {
  expect(
    computeCoordsFromPlacement({reference, popper, placement: 'left'})
  ).toEqual({x: -50, y: 25});
});

test('left-start', () => {
  expect(
    computeCoordsFromPlacement({reference, popper, placement: 'left-start'})
  ).toEqual({x: -50, y: 0});
});

test('left-end', () => {
  expect(
    computeCoordsFromPlacement({reference, popper, placement: 'left-end'})
  ).toEqual({x: -50, y: 50});
});
