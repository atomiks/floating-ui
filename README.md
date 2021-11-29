# Floating UI

### Powerful positioning primitives

Floating UI is a low-level library for positioning "floating" elements like
tooltips, popovers, dropdowns, menus and more. Since these types of elements
float on top of the UI without disrupting the flow of content, challenges arise
when positioning them.

Floating UI exposes primitives which enable a floating element to be positioned
next to a given reference element while appearing in view for the user as best
as possible. Features include overflow prevention (or collision awareness),
placement flipping, and more.

- **Tiny**: 600-byte core with highly modular architecture for tree-shaking
- **Low-level**: Hyper-granular control over positioning behavior
- **Pure**: Predictable, side-effect free behavior
- **Extensible**: Powerful middleware system
- **Platform-agnostic**: Runs on any JavaScript environment which provides
  measurement APIs, including the web and React Native

## Installation

To use it on the web:

```shell
npm install @floating-ui/dom
```

```shell
yarn add @floating-ui/dom
```

## Quick start

```js
import {computePosition} from '@floating-ui/dom';

const referenceElement = document.querySelector('#button');
const floatingElement = document.querySelector('#tooltip');

computePosition(referenceElement, floatingElement, {
  placement: 'right',
}).then(({x, y}) => {
  Object.assign(floatingElement.style, {
    left: `${x}px`,
    top: `${y}px`,
  });
});
```

Visit the docs for detailed information.

## Components

Right now, Floating UI focuses on positioning floating elements, but a package
that exposes higher-level primitives for building these elements more easily is
in development.

## Inspiration

Floating UI is an evolution of libraries in this space like Popper and Tether,
developed by the co-author of the former and creator of Tippy.js. Much of the
code is forked from Popper 2's codebase and adapted to the new API.

## License

MIT
