import Highlight, {defaultProps} from 'prism-react-renderer';
import Prism from 'prism-react-renderer/prism';
import rangeParser from 'parse-numeric-range';
import {theme} from '../assets/moonlight.js';

const calculateLinesToHighlight = (meta) => {
  const RE = /{([\d,-]+)}/;
  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)[1];
    const lineNumbers = rangeParser(strlineNumbers);
    return (index) => lineNumbers.includes(index + 1);
  } else {
    return () => false;
  }
};

['javascript', 'jsx'].forEach((lang) => {
  // TODO: fix JSX syntax highlighting
  if (lang !== 'jsx') {
    Prism.languages.insertBefore(lang, 'operator', {
      'literal-property': {
        pattern:
          /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: true,
      },
    });
    Prism.languages.insertBefore(lang, 'operator', {
      constant: {
        pattern: /(?<=const\s)[_$a-zA-Z\xA0-\uFFFF]+/,
      },
    });
    Prism.languages.insertBefore(lang, 'operator', {
      object: {
        pattern:
          /[_$a-zA-Z\xA0-\uFFFF]+(?=\.[_$a-zA-Z\xA0-\uFFFF]+)/,
      },
    });
  }
});

export default function Code({children, className, metastring}) {
  const code = children.trim();
  const shouldHighlightLine =
    calculateLinesToHighlight(metastring);
  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={className?.split('-')[1]}
      theme={theme}
      Prism={Prism}
    >
      {({
        className,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => {
            const lineProps = getLineProps({line, key: i});
            if (shouldHighlightLine(i)) {
              lineProps.className = 'bg-gray-700 -mx-6 px-6';
            }
            return (
              <div key={i} {...lineProps}>
                {line.map((token, key) => (
                  <span
                    key={key}
                    {...getTokenProps({token, key})}
                  />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}
