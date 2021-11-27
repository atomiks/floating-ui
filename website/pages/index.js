import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/perspective-subtle.css';

import Image from 'next/image';
import Highlight, {defaultProps} from 'prism-react-renderer';
import Tippy from '@tippyjs/react';
import {sticky, followCursor, inlinePositioning} from 'tippy.js';
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Check,
  ArrowRight,
  ChevronRight,
  GitHub,
  Heart,
} from 'react-feather';
import Link from 'next/link';
import {theme} from '../assets/moonlight.js';
import DropdownExample from '../components/DropdownExample.js';
import cn from 'classnames';
import Code from '../components/Code';

import Logo from '../assets/logo.svg';
import Orbs from '../assets/orbs.svg';

function useOnScreen(ref, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return isIntersecting;
}

const tooltipHtmlCode = `
<button id="button">🙂</button>
<div id="tooltip">Add emoji</button>
`.trim();

function Placement() {
  const [placement, setPlacement] = useState('top');

  const code = `
import {computePosition} from '@floating-ui/dom';

const button = document.querySelector('#button');
const tooltip = document.querySelector('#tooltip');

const {x, y} = await computePosition(button, tooltip, {
  placement: '${placement}'
});

Object.assign(tooltip.style, {
  left: x + 'px',
  top: y + 'px'
});
`.trim();

  return (
    <div className="mb-4 grid lg:grid-cols-12 gap-8 bg-gradient-to-r from-blue-800 to-purple-700 rounded-lg px-4 py-8 sm:p-8">
      <div className="lg:col-span-7 overflow-hidden">
        <h3 className="text-3xl text-gray-50 font-bold mb-4">
          Placement
        </h3>
        <p className="text-2xl text-blue-200 mb-4">
          Position your floating element on 12 core placements.
        </p>
        <div className="rounded-lg bg-gray-800 p-4 overflow-auto w-full">
          <Code className="language-javascript">{code}</Code>
        </div>
      </div>
      <div
        className="grid lg:col-span-5 relative items-center bg-gray-300 rounded-lg"
        style={{minHeight: 500}}
      >
        <div className="text-center">
          {[
            {
              placement: 'top',
              styles: {
                left: 'calc(50% - 10px - 1rem)',
                top: 75,
              },
            },
            {
              placement: 'top-start',
              styles: {
                left: 'calc(50% - 70px - 1rem)',
                top: 75,
              },
            },
            {
              placement: 'top-end',
              styles: {
                left: 'calc(50% + 50px - 1rem)',
                top: 75,
              },
            },
            {
              placement: 'bottom',
              styles: {
                left: 'calc(50% - 10px - 1rem)',
                bottom: 75,
              },
            },
            {
              placement: 'bottom-start',
              styles: {
                left: 'calc(50% - 70px - 1rem)',
                bottom: 75,
              },
            },
            {
              placement: 'bottom-end',
              styles: {
                left: 'calc(50% + 50px - 1rem)',
                bottom: 75,
              },
            },
            {
              placement: 'right',
              styles: {
                top: 'calc(50% - 10px - 1rem)',
                right: 50,
              },
            },
            {
              placement: 'right-start',
              styles: {
                top: 'calc(50% - 70px - 1rem)',
                right: 50,
              },
            },
            {
              placement: 'right-end',
              styles: {
                top: 'calc(50% + 50px - 1rem)',
                right: 50,
              },
            },
            {
              placement: 'left',
              styles: {
                top: 'calc(50% - 10px - 1rem)',
                left: 50,
              },
            },
            {
              placement: 'left-start',
              styles: {
                top: 'calc(50% - 70px - 1rem)',
                left: 50,
              },
            },
            {
              placement: 'left-end',
              styles: {
                top: 'calc(50% + 50px - 1rem)',
                left: 50,
              },
            },
          ].map(({placement: p, styles}) => (
            <button
              key={p}
              className="p-4 absolute transform transition hover:scale-125"
              style={styles}
              onClick={() => setPlacement(p)}
              aria-label={p}
            >
              <div
                className={cn(
                  ' rounded-full border-2 border-solid border-blue-600',
                  {
                    'bg-blue-600': placement === p,
                  }
                )}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </button>
          ))}
          <Tippy
            placement={placement}
            visible
            content="Tooltip"
            offset={[0, 8]}
            arrow={false}
            popperOptions={{
              modifiers: [
                {
                  name: 'flip',
                  enabled: false,
                },
                {
                  name: 'preventOverflow',
                  enabled: false,
                },
              ],
            }}
          >
            <button
              className="bg-blue-600 rounded text-md text-gray-50 p-2"
              style={{height: 150, width: 150}}
            >
              Click the dots
            </button>
          </Tippy>
        </div>
      </div>
    </div>
  );
}

function Shift() {
  const [boundary, setBoundary] = useState();

  const code = `
import {computePosition, shift} from '@floating-ui/dom';

const button = document.querySelector('#button');
const tooltip = document.querySelector('#tooltip');

const {x, y} = await computePosition(button, tooltip, {
  placement: 'right',
  modifiers: [shift()]
});

Object.assign(tooltip.style, {
  left: x + 'px',
  top: y + 'px'
});
`.trim();

  useLayoutEffect(() => {
    if (boundary) {
      boundary.firstElementChild.scrollTop = 200;
    }
  }, [boundary]);

  return (
    <div className="mb-4 grid lg:grid-cols-12 gap-8 bg-gradient-to-r from-green-700 to-blue-700 rounded-lg px-4 py-8 sm:p-8">
      <div className="lg:col-span-7 overflow-hidden">
        <h3 className="text-3xl text-gray-50 font-bold mb-4">
          Shift
        </h3>
        <p className="text-2xl text-green-200 mb-4">
          Shift the floating element in view to prevent overflow.
        </p>
        <div className="rounded-lg bg-gray-800 p-4 overflow-auto">
          <Code className="language-javascript">{code}</Code>
        </div>
      </div>
      <div
        ref={setBoundary}
        className="grid lg:col-span-5 relative overflow-hidden p-2 bg-gray-300 rounded-lg"
      >
        <div
          className="grid relative items-center bg-gray-300 rounded-lg overflow-scroll w-full border-4 border-solid border-red-600"
          style={{height: 450}}
        >
          <div
            style={{
              height: 400,
              width: 1,
            }}
          />
          <div className="text-center">
            <Tippy
              visible={!!boundary}
              placement="right"
              content={
                <div className="px-4 text-center">
                  <div style={{height: 125}}></div>
                  <div>Floating</div>
                  <div>Element</div>
                  <div style={{height: 125}}></div>
                </div>
              }
              offset={[0, 8]}
              appendTo={() => boundary ?? document.body}
              popperOptions={{
                modifiers: [
                  {
                    name: 'preventOverflow',
                    options: {
                      rootBoundary: 'document',
                      padding: 15,
                      tether: false,
                    },
                  },
                ],
              }}
            >
              <button className="bg-blue-600 rounded text-md text-gray-50 p-2">
                Scroll
              </button>
            </Tippy>
          </div>
          <div
            style={{
              height: 400,
              width: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Flip() {
  const [boundary, setBoundary] = useState();

  const code = `
import {computePosition, flip} from '@floating-ui/dom';

const button = document.querySelector('#button');
const tooltip = document.querySelector('#tooltip');

const {x, y} = await computePosition(button, tooltip, {
  placement: 'top',
  modifiers: [flip()]
});

Object.assign(tooltip.style, {
  left: x + 'px',
  top: y + 'px'
});
`.trim();

  useLayoutEffect(() => {
    if (boundary) {
      boundary.firstElementChild.scrollTop = 275;
    }
  }, [boundary]);

  return (
    <div className="mb-4 grid lg:grid-cols-12 gap-8 bg-gradient-to-r from-pink-600 to-red-700 rounded-lg px-4 py-8 sm:p-8">
      <div className="grid lg:col-span-7 overflow-hidden">
        <h3 className="text-3xl text-gray-50 font-bold mb-4">
          Flip
        </h3>
        <p className="text-2xl text-red-100 mb-4">
          Flip the floating element to the opposite placement to
          prevent overflow.
        </p>
        <div className="rounded-lg bg-gray-800 p-4 overflow-auto">
          <Code className="language-javascript">{code}</Code>
        </div>
      </div>
      <div
        className="grid lg:col-span-5 relative overflow-hidden p-2 bg-gray-300 rounded-lg"
        ref={setBoundary}
      >
        <div
          className="grid relative items-center bg-gray-300 rounded-lg overflow-scroll w-full border-4 border-styled border-red-600"
          style={{height: 485}}
        >
          <div
            style={{
              height: 500,
              width: 1,
            }}
          />
          <div className="text-center">
            <Tippy
              visible
              content={
                <div className="px-4">
                  <div style={{height: 30}}></div>
                  <span>Tooltip</span>
                  <div style={{height: 30}}></div>
                </div>
              }
              offset={[0, 8]}
              appendTo="parent"
              popperOptions={{
                modifiers: [
                  {
                    name: 'preventOverflow',
                    options: {
                      rootBoundary: 'document',
                    },
                  },
                ],
              }}
            >
              <button className="bg-blue-600 rounded text-md text-gray-50 p-2">
                Scroll
              </button>
            </Tippy>
          </div>
          <div
            style={{
              height: 500,
              width: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Popovers() {
  return (
    <div className="grid lg:grid-cols-2 gap-4 bg-gradient-to-tr from-purple-600 to-blue-800 rounded-lg px-4 py-8 sm:p-8">
      <div>
        <h3 className="text-3xl text-gray-50 font-bold mb-4">
          Popovers
        </h3>
        <p className="text-2xl text-pink-100 mb-4">
          Floating elements displaying rich HTML content
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center align-center bg-gray-300 py-12 text-gray-900 rounded-lg p-4">
          <div className="text-center">
            <Tippy
              content={
                <div className="text-left">
                  <h3 className="text-xl font-bold p-2">
                    My popover title
                  </h3>
                  <div className="h-px bg-gray-200"></div>
                  <p className="p-2">
                    My long popover description that spans over
                    multiple lines.
                  </p>
                </div>
              }
              theme="light-border"
              animation="scale-subtle"
              trigger="click"
              duration={[250, 150]}
              maxWidth={250}
              aria={{content: 'labelledby'}}
            >
              <button className="text-lg bg-blue-600 text-gray-50 hover:bg-blue-700 p-3 transition-colors rounded">
                View explanation
              </button>
            </Tippy>
            <div className="text-gray-500 mt-2">
              Click to open
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dropdowns() {
  return (
    <div className="grid lg:grid-cols-2 gap-4 bg-gradient-to-tr from-blue-600 via-purple-700 to-pink-600 rounded-lg px-4 py-8 sm:p-8">
      <div>
        <h3 className="text-3xl text-gray-50 font-bold mb-4">
          Dropdowns
        </h3>
        <p className="text-2xl mb-4 text-pink-100">
          A menu of items and submenus
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center align-center bg-gray-300 py-12 text-gray-900 rounded-lg p-4">
          <div className="text-center">
            <DropdownExample />
            <div className="text-gray-500 mt-2">
              Click to open
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tooltips() {
  return (
    <div className="grid lg:grid-cols-2 gap-8 bg-gradient-to-r from-blue-800 to-purple-700 rounded-lg px-4 py-8 sm:p-8">
      <div>
        <h3 className="text-3xl text-gray-50 font-bold mb-4">
          Tooltips
        </h3>
        <p className="text-2xl text-blue-200 mb-4">
          A floating element to describe an element, e.g. button
        </p>
      </div>
      <div className="flex flex-col gap-2 overflow-hidden">
        <div className="flex justify-center align-center bg-gray-300 py-12 text-gray-900 rounded-lg">
          <div className="text-center">
            <Tippy content="Add emoji" offset={[0, 8]}>
              <button className="text-3xl">🙂</button>
            </Tippy>
            <div className="text-gray-500">
              Hover, tap, or focus
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const [boundary, setBoundary] = useState();
  const scrollAreaRef = useRef();
  const stickyRef = useRef();
  const stickyVisible = useOnScreen(stickyRef);
  const floatingBoxRef = useRef();
  const floatingBoxVisible = useOnScreen(floatingBoxRef);

  return (
    <>
      <header
        className="from-gray-700 to-gray-800 mb-24 overflow-hidden relative"
        style={{height: 500}}
      >
        <div className="container py-8 mx-auto px-4 text-center max-w-screen-xl">
          <Logo
            className="mx-auto"
            aria-label="Floating UI logo"
          />
          <div
            className="absolute -z-1 w-full"
            style={{
              left: 'calc(-60rem + 50vw)',
              top: '-15rem',
              width: 1000,
            }}
          >
            <Orbs aria-hidden="true" />
          </div>
          <h1 className="text-gray-50 mb-8 text-6xl font-bold">
            Floating UI
          </h1>
          <div className="flex flex-row justify-center gap-x-4">
            <Link href="/docs/getting-started">
              <a
                className="flex items-center gap-2 filter hover:contrast-200 bg-gradient-to-b from-blue-500 to-blue-600 shadow-lg rounded text-gray-50 px-4 py-3 text-xl font-bold"
                href="/docs/getting-started"
              >
                Get Started <ArrowRight />
              </a>
            </Link>
            <button className="flex transition items-center gap-2 bg-gray-50 rounded text-gray-900 px-4 py-3 text-xl shadow-lg font-bold">
              <GitHub /> GitHub
            </button>
          </div>
        </div>
      </header>
      <main className="relative">
        <div className="container mx-auto px-4 max-w-screen-xl -mt-48">
          <h2 className="inline-block text-4xl leading-gradient-heading lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Powerful positioning primitives.
          </h2>
          <p className="text-2xl lg:text-3xl text-left">
            Position all types of{' '}
            <Tippy
              content={
                <>
                  A <strong>floating element</strong> is one that
                  sits on top of the UI without disrupting the
                  flow of content (i.e. not inline)
                </>
              }
              theme="light-border"
              aria={{content: 'labelledby'}}
            >
              <span
                tabIndex={0}
                className="relative"
                style={{
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'wavy',
                  textUnderlineOffset: '20%',
                  textDecorationThickness: 2,
                  textDecorationColor:
                    'rgba(200, 200, 255, 0.25)',
                }}
              >
                floating elements
              </span>
            </Tippy>{' '}
            with full control. Tooltips, popovers, dropdowns,
            menus, and more.
          </p>
        </div>
        <div className="container px-4 py-8 mx-auto max-w-screen-xl">
          <Placement />
          <Shift />
          <Flip />
        </div>

        <div className="container mx-auto px-4 max-w-screen-xl relative">
          <h2 className="inline-block text-transparent leading-gradient-heading bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 text-4xl lg:text-5xl font-bold mt-8 mb-4">
            Light as a feather.
          </h2>
          <p className="text-2xl lg:text-3xl text-left mb-8">
            The core is only 600 bytes when minified and
            compressed with brotli. Plus, the architecture is
            super modular, so tree-shaking works like a charm.
          </p>
          <div className="grid items-center py-4">
            <div className="flex flex-col text-center text-xl md:text-2xl mx-auto md:pr-40">
              <div className="mb-2 flex gap-2 items-center justify-center">
                <code className="flex-1 text-blue-400 text-right">
                  computePosition
                  <span className="text-blue-200">();</span>
                </code>
                <span className="text-lg text-gray-100 text-left">
                  +0.6 kB
                </span>
              </div>
              <div className="mb-2 flex gap-2 items-center justify-center">
                <code className="flex-1 text-blue-400 text-right">
                  shift<span className="text-blue-200">();</span>
                </code>
                <span className="text-lg text-yellow-500 text-left">
                  +1.0 kB
                </span>
              </div>
              <div className="mb-2 flex gap-2 items-center justify-center">
                <code className="flex-1 text-blue-400 text-right">
                  limitShift
                  <span className="text-blue-200">();</span>
                </code>
                <span className="text-lg text-green-500 text-left">
                  +0.3 kB
                </span>
              </div>
              <div className="mb-2 flex gap-2 items-center justify-center">
                <code className="flex-1 text-blue-400 text-right">
                  flip<span className="text-blue-200">();</span>
                </code>
                <span className="text-lg text-green-500 text-left">
                  +0.3 kB
                </span>
              </div>
              <div className="mb-2 flex gap-2 items-center justify-center">
                <code className="flex-1 text-blue-400 text-right">
                  hide<span className="text-blue-200">();</span>
                </code>
                <span className="text-lg text-green-500 text-left">
                  +0.1 kB
                </span>
              </div>
              <div className="mb-2 flex gap-2 items-center justify-center">
                <code className="flex-1 text-blue-400 text-right">
                  arrow<span className="text-blue-200">();</span>
                </code>
                <span className="text-lg text-green-500 text-left">
                  +0.2 kB
                </span>
              </div>
              <div className="mb-2 flex gap-2 items-center justify-center">
                <code className="flex-1 text-blue-400 text-right">
                  offset
                  <span className="text-blue-200">();</span>
                </code>
                <span className="text-lg text-green-500 text-left">
                  +0.2 kB
                </span>
              </div>
              <div className="mb-2 flex gap-2 items-center justify-center">
                <code className="flex-1 text-blue-400 text-right">
                  size<span className="text-blue-200">();</span>
                </code>
                <span className="text-lg text-green-500 text-left">
                  +0.1 kB
                </span>
              </div>
              <div className="mb-2 flex gap-2 items-center justify-center">
                <code className="flex-1 text-blue-400 text-right">
                  autoPlacement
                  <span className="text-blue-200">();</span>
                </code>
                <span className="text-lg text-green-500 text-left">
                  +0.3 kB
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-screen-xl relative">
          <h2 className="inline-block leading-gradient-heading text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 mt-16">
            Endlessly extensible.
          </h2>
          <p className="text-2xl lg:text-3xl text-left mb-8">
            The core package exports modifiers that cover 99% of
            positioning use cases, but for the remaining 1%, it's
            straightforward to add your own positioning logic.
          </p>

          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-red-600 to-pink-700 rounded-lg py-8 px-12">
              <h3 className="text-3xl text-gray-50 font-bold mb-4 text-yellow-100">
                Core modifiers
              </h3>
              <ul className="text-xl text-pink-100 pl-6 flex flex-col gap-2">
                <li className="relative">
                  <Check
                    className="absolute top-1"
                    style={{left: '-2rem'}}
                  />
                  Instantly importable and usable
                </li>
                <li className="relative">
                  <Check
                    className="absolute top-1"
                    style={{left: '-2rem'}}
                  />
                  Simple and powerful
                </li>
                <li className="relative">
                  <Check
                    className="absolute top-1"
                    style={{left: '-2rem'}}
                  />
                  Customizable through options
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-600 to-pink-700 rounded-lg py-8 px-12">
              <h3 className="text-3xl text-gray-50 font-bold mb-4 text-yellow-100">
                Custom modifiers
              </h3>
              <ul className="text-xl text-pink-100 pl-6 flex flex-col gap-2">
                <li className="relative">
                  <Check
                    className="absolute top-1"
                    style={{left: '-2rem'}}
                  />
                  Modify positioning coordinates
                </li>
                <li className="relative">
                  <Check
                    className="absolute top-1"
                    style={{left: '-2rem'}}
                  />
                  Add custom data
                </li>
                <li className="relative">
                  <Check
                    className="absolute top-1"
                    style={{left: '-2rem'}}
                  />
                  Add custom behavior
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-screen-xl relative">
          <h2 className="inline-block leading-gradient-heading text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-red-300 to-green-300 mt-16">
            Components!
          </h2>
          <p className="text-2xl lg:text-3xl text-left mb-8">
            Higher-level primitives to craft beautiful and
            accessible tooltips, popovers, dropdowns, and more is
            in development.
          </p>

          <div className="grid lg:grid-cols-2 gap-4">
            <Tooltips />
            <Dropdowns />
            <Popovers />

            <div className="bg-gradient-to-tr from-gray-700 to to-gray-800 rounded-lg px-4 py-8 sm:p-8">
              <h3 className="text-3xl text-gray-50 font-bold mb-4">
                Coming soon
              </h3>
              <p className="text-xl mb-4">
                The{' '}
                <span className="text-gray-50 font-bold">
                  @floating-ui/components
                </span>{' '}
                package is in development. Consider supporting
                the future of this project through sponsorship:
              </p>
              <button className="flex items-center gap-2 text-xl border-2 border-solid border-pink-300 text-pink-300 rounded px-4 py-2 hover:bg-pink-300 hover:text-gray-900 transition">
                Support <Heart />
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-screen-xl relative">
          <h2 className="inline-block text-4xl lg:text-5xl leading-gradient-heading font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 via-red-400 to-yellow-100 mt-16">
            Ready to install?
          </h2>
          <p className="text-2xl lg:text-3xl text-left mb-8">
            Start playing via CDN or your package manager.
          </p>

          <div className="grid lg:grid-cols-2 gap-4">
            <div className="text-gray-900 bg-gradient-to-tr from-blue-400 via-green-400 to-yellow-100 rounded-lg py-8 px-12">
              <h3 className="text-3xl font-bold mb-4">
                Package Manager
              </h3>
              <p className="text-xl">
                Install with npm or Yarn.
              </p>
              <Link href="/docs/getting-started">
                <a
                  href="/docs/getting-started"
                  className="text-2xl font-bold flex gap-2 items-center mt-4"
                >
                  Get started <ArrowRight />
                </a>
              </Link>
            </div>
            <div className="text-gray-900 bg-gradient-to-tr from-blue-400 via-green-400 to-yellow-100 rounded-lg py-8 px-12">
              <h3 className="text-3xl font-bold mb-4">CDN</h3>
              <p className="text-xl">
                Install with the unpkg CDN.
              </p>
              <Link href="/docs/getting-started#cdn">
                <a
                  href="/docs/getting-started#cdn"
                  className="text-2xl font-bold flex gap-2 items-center mt-4"
                >
                  Get started <ArrowRight />
                </a>
              </Link>
            </div>
          </div>
        </div>

        <footer className="text-center text-gray-500 bg-gray-1000 mt-16 py-8">
          <div className="flex flex-col gap-3 container mx-auto px-4 max-w-screen-xl">
            <p>MIT License • {new Date().getFullYear()}</p>
            <p className="text-gray-400">
              Floating UI is a project by the creator Tippy.js
              and co-author of Popper 2, designed to be a
              next-generation evolution of those libraries.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

export default HomePage;
