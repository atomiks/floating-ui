import {MDXProvider} from '@mdx-js/react';
import Code from './Code';
import Warning from './Warning';
import Collapsible from './Collapsible';
import Navigation from './Navigation';
import Logo from '../assets/logo.svg';
import Link from 'next/link';
import {useRouter} from 'next/router';
import cn from 'classnames';
import {
  useEffect,
  useState,
  Children,
  useLayoutEffect,
} from 'react';
import Tippy from '@tippyjs/react';
import {Menu} from 'react-feather';

const nav = [
  {url: '/docs/getting-started', title: 'Getting Started'},
  {url: '/docs/computePosition', title: 'computePosition'},
  {url: '/docs/modifiers', title: 'Modifiers'},
  {url: '/docs/offset', title: 'offset'},
  {url: '/docs/shift', title: 'shift'},
  {url: '/docs/flip', title: 'flip'},
  {url: '/docs/arrow', title: 'arrow'},
  {url: '/docs/size', title: 'size'},
  {url: '/docs/autoPlacement', title: 'autoPlacement'},
  {url: '/docs/hide', title: 'hide'},
  {url: '/docs/detectOverflow', title: 'detectOverflow'},
  {url: '/docs/virtual-elements', title: 'Virtual Elements'},
  {url: '/docs/tutorial', title: 'Tutorial'},
  {url: '/docs/react-dom', title: 'React DOM'},
  {url: '/docs/react-native', title: 'React Native'},
];

const slugify = (str) =>
  str.toLowerCase().replace(/[\s.]/g, '-').replace(/[.:]/g, '');

const linkify =
  (Tag) =>
  ({children, ...props}) => {
    const url = slugify(
      typeof children !== 'string'
        ? children.props.children
        : children
    );
    return (
      <Tag {...props} id={url}>
        <a href={`#${url}`} className="inline-block">
          {children}
        </a>
      </Tag>
    );
  };

const components = {
  pre: (props) => <div {...props} />,
  code: (props) => <Code {...props} />,
  Warning,
  Collapsible,
  Tippy,
  h2: linkify('h2'),
  h3: linkify('h3'),
  h4: linkify('h4'),
  h5: linkify('h5'),
  h6: linkify('h6'),
};

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Layout({children}) {
  const {pathname, events} = useRouter();
  const [index, setIndex] = useState(
    nav.findIndex(({url}) => url === pathname) ?? 0
  );
  const [navOpen, setNavOpen] = useState(false);

  // https://github.com/FormidableLabs/prism-react-renderer/issues/40
  useIsomorphicLayoutEffect(() => {
    const stylesheet = document.createElement('style');
    stylesheet.innerHTML = `
      .token.property-access:not(.function) {
        color: #a9b8e8 !important;
      }

      .token.method.function {
        color: #33c2e3 !important;
      }
    `;

    document.head?.append(stylesheet);
    return () => {
      stylesheet.remove();
    };
  }, []);

  const anchors = Children.toArray(children)
    .filter(
      (child) =>
        child.props?.mdxType &&
        ['h2', 'h3'].includes(child.props.mdxType)
    )
    .map((child) => {
      const url = slugify(
        typeof child.props.children === 'string'
          ? child.props.children
          : child.props.children.props.children
      );
      return {
        url: `#${url}`,
        title: child.props.children,
        depth:
          (child.props?.mdxType &&
            parseInt(child.props.mdxType.replace('h', ''), 0)) ??
          0,
      };
    });

  return (
    <MDXProvider components={components}>
      <div className="md:pl-80">
        <div className="container pl-4">
          <button
            aria-label="Open menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen(!navOpen)}
            className="block -mb-8 mt-4 bg-gray-50 text-gray-900 rounded p-3 md:hidden"
          >
            <Menu />
          </button>
        </div>
        <nav
          className={cn(
            'fixed bg-gray-1000 h-full w-64 top-0 left-0 overflow-y-auto md:block bg-opacity-90 backdrop-filter backdrop-blur-lg z-10',
            {
              hidden: !navOpen,
            }
          )}
        >
          <div className="container mx-auto">
            <Link href="/">
              <a href="/">
                <Logo className="h-28 mx-auto mt-4" />
              </a>
            </Link>
            {navOpen && (
              <button
                onClick={() => setNavOpen(false)}
                className="ml-6 my-4 bg-gray-50 text-gray-900 rounded p-2"
              >
                Close
              </button>
            )}
            <ul className="text-lg pl-6">
              {nav.map(({url, title}) => (
                <li key={url}>
                  <Link href={url}>
                    <a
                      href={url}
                      className={cn('block w-full py-1', {
                        'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 font-bold':
                          pathname === url,
                        'hover:text-gray-50': pathname !== url,
                      })}
                    >
                      {title}
                    </a>
                  </Link>
                  <ul>
                    {pathname === url &&
                      anchors
                        .filter(({depth}) => depth === 2)
                        .map(({url, title, depth}) => (
                          <li
                            key={url}
                            className={cn(`text-gray-400`, {
                              'pl-4': depth === 2,
                              'pl-8': depth === 3,
                            })}
                          >
                            <a
                              href={url}
                              className="block w-full truncate"
                            >
                              {title}
                            </a>
                          </li>
                        ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div
          className="container px-4 my-16 mx-auto"
          style={{maxWidth: '70ch'}}
        >
          <article className="prose prose-lg">
            {children}
          </article>
          <Navigation
            back={nav[index - 1]}
            next={nav[index + 1]}
          />
        </div>
      </div>
    </MDXProvider>
  );
}
