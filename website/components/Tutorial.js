import React, {forwardRef} from 'react';
import Tippy from '@tippyjs/react/headless';
import {Chrome} from './Chrome';

const Button = forwardRef(({children, ...props}, ref) => (
  <button
    ref={ref}
    className="bg-gray-100 px-2 rounded"
    {...props}
  >
    {children}
  </button>
));

export const Result1 = () => {
  return (
    <Chrome>
      <Button>My button</Button>
      <div>My tooltip</div>
    </Chrome>
  );
};

export const Result2 = () => {
  return (
    <Chrome>
      <Button>My button</Button>
      <div className="bg-gray-900 text-gray-50 rounded font-bold text-sm p-1">
        My tooltip
      </div>
    </Chrome>
  );
};

export const Result3 = () => {
  return (
    <Chrome>
      <Button>My button</Button>
      <div className="absolute bg-gray-900 text-gray-50 rounded font-bold text-sm p-1">
        My tooltip
      </div>
    </Chrome>
  );
};

export const Result4 = () => {
  return (
    <Chrome>
      <Tippy
        visible
        placement="bottom"
        offset={[0, 0]}
        render={() => (
          <div className="bg-gray-900 text-gray-50 rounded font-bold text-sm p-1">
            My tooltip
          </div>
        )}
        popperOptions={{
          modifiers: [{name: 'flip', enabled: false}],
        }}
      >
        <Button>My button</Button>
      </Tippy>
    </Chrome>
  );
};

export const Result5 = () => {
  return (
    <Chrome>
      <Tippy
        visible
        placement="right"
        offset={[0, 0]}
        render={() => (
          <div className="bg-gray-900 text-gray-50 rounded font-bold text-sm p-1">
            My tooltip
          </div>
        )}
        popperOptions={{
          modifiers: [{name: 'preventOverflow', enabled: false}],
        }}
      >
        <Button>My button</Button>
      </Tippy>
    </Chrome>
  );
};

export const Result6 = () => {
  return (
    <Chrome>
      <Tippy
        visible
        placement="top"
        offset={[0, 0]}
        render={() => (
          <div className="bg-gray-900 text-gray-50 rounded font-bold text-sm p-1">
            My tooltip
          </div>
        )}
        zIndex={0}
      >
        <Button>My button</Button>
      </Tippy>
    </Chrome>
  );
};

export const Result7 = () => {
  return (
    <Chrome>
      <Tippy
        visible
        placement="bottom"
        offset={[0, 0]}
        render={() => (
          <div className="bg-gray-900 text-gray-50 rounded font-bold text-sm p-1">
            My tooltip
          </div>
        )}
        popperOptions={{
          modifiers: [
            {name: 'flip', enabled: false},
            {name: 'preventOverflow', enabled: false},
          ],
        }}
      >
        <Button>My button</Button>
      </Tippy>
    </Chrome>
  );
};

export const Result8 = () => {
  return (
    <Chrome>
      <Tippy
        visible
        placement="bottom"
        offset={[0, 0]}
        appendTo="parent"
        render={() => (
          <div className="bg-gray-900 text-gray-50 rounded font-bold text-sm p-1">
            My tooltip with more content
          </div>
        )}
        popperOptions={{
          modifiers: [
            {name: 'flip', enabled: false},
            {name: 'preventOverflow', enabled: false},
          ],
        }}
      >
        <Button>My button</Button>
      </Tippy>
    </Chrome>
  );
};

export const Result9 = () => {
  return (
    <Chrome>
      <Tippy
        visible
        placement="bottom"
        offset={[0, 0]}
        appendTo="parent"
        render={() => (
          <div className="bg-gray-900 text-gray-50 rounded font-bold text-sm p-1">
            My tooltip with more content
          </div>
        )}
        popperOptions={{
          modifiers: [
            {
              name: 'preventOverflow',
              options: {padding: 0},
            },
            {name: 'flip', enabled: false},
          ],
        }}
      >
        <Button>My button</Button>
      </Tippy>
    </Chrome>
  );
};

export const Result10 = () => {
  return (
    <Chrome>
      <Tippy
        visible
        placement="bottom"
        offset={[0, 0]}
        appendTo="parent"
        render={() => (
          <div className="bg-gray-900 text-gray-50 rounded font-bold text-sm p-1">
            My tooltip with more content
          </div>
        )}
        popperOptions={{
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                padding: 5,
              },
            },
          ],
        }}
      >
        <Button>My button</Button>
      </Tippy>
    </Chrome>
  );
};

export const Result11 = () => {
  return (
    <Chrome>
      <Tippy
        visible
        placement="bottom"
        offset={[0, 5]}
        appendTo="parent"
        render={() => (
          <div className="bg-gray-900 text-gray-50 rounded font-bold text-sm p-1">
            My tooltip with more content
          </div>
        )}
      >
        <Button>My button</Button>
      </Tippy>
    </Chrome>
  );
};

export const Result12 = () => {
  return (
    <Chrome>
      <Tippy
        visible
        placement="bottom"
        offset={[0, 6]}
        appendTo="parent"
        render={() => (
          <div className="bg-gray-900 text-gray-50 rounded font-bold text-sm p-1">
            My tooltip with more content
            <div style={{}} data-popper-arrow className="-z-1">
              <div className="relative transform rotate-45 w-2 h-2 bg-gray-900" />
            </div>
          </div>
        )}
        popperOptions={{
          modifiers: [
            {
              name: 'customArrowStyle',
              enabled: true,
              phase: 'beforeWrite',
              requires: ['computeStyles'],
              fn({state}) {
                state.styles.arrow.top = '-0.25rem';
              },
            },
          ],
        }}
      >
        <Button>My button</Button>
      </Tippy>
    </Chrome>
  );
};

export const Result13 = () => {
  return (
    <Chrome>
      <Tippy
        placement="bottom"
        offset={[0, 6]}
        hideOnClick={false}
        appendTo="parent"
        render={() => (
          <div className="bg-gray-900 text-gray-50 rounded font-bold text-sm p-1">
            My tooltip with more content
            <div style={{}} data-popper-arrow className="-z-1">
              <div className="relative transform rotate-45 w-2 h-2 bg-gray-900" />
            </div>
          </div>
        )}
        popperOptions={{
          modifiers: [
            {
              name: 'customArrowStyle',
              enabled: true,
              phase: 'beforeWrite',
              requires: ['computeStyles'],
              fn({state}) {
                state.styles.arrow.top = '-0.25rem';
              },
            },
          ],
        }}
      >
        <Button>My button</Button>
      </Tippy>
    </Chrome>
  );
};
