const colors = {
  indigo: '#818abf',
  cyan: '#87e1fc',
  red: '#ff757f',
  lightRed: '#ff9fb1',
  teal: '#4fd6be',
  gray: '#7a808a',
  skyBlue: '#49c3ff',
  blue: '#85a9ff',
  yellow: '#ffc07c',
  orange: '#ff895b',
  purple: '#c096ff',
  green: '#cff894',
  pink: '#fca7ea',
  lightGray: '#b4c2f0',
};

export const InlineCode = ({children, ...props}) => {
  // literals
  if (children === 'Object.assign()') {
    return (
      <code>
        <span style={{color: colors.yellow}}>Object</span>
        <span style={{color: colors.cyan}}>.</span>
        <span style={{color: colors.skyBlue}}>assign</span>
        <span style={{color: colors.lightGray}}>()</span>
      </code>
    );
  }
  if (children === 'window.FloatingUIDOM') {
    return (
      <code>
        <span style={{color: colors.yellow}}>window</span>
        <span style={{color: colors.cyan}}>.</span>
        <span style={{color: colors.yellow}}>FloatingUIDOM</span>
      </code>
    );
  }
  if (children === ".split('-')[0]") {
    return (
      <code>
        <span style={{color: colors.cyan}}>.</span>
        <span style={{color: colors.skyBlue}}>split</span>
        <span style={{color: colors.cyan}}>('</span>
        <span style={{color: colors.green}}>-</span>
        <span style={{color: colors.cyan}}>')[</span>
        <span style={{color: colors.orange}}>0</span>
        <span style={{color: colors.cyan}}>]</span>
      </code>
    );
  }

  // classes
  if (/^[A-Z]/.test(children)) {
    return (
      <code
        {...props}
        style={{color: colors.yellow, fontWeight: 'bold'}}
      >
        {children}
      </code>
    );
  }

  // HTML or JSX
  if (children.startsWith('<')) {
    const isComponent =
      children[1].toUpperCase() === children[1];
    return (
      <code>
        <span style={{color: colors.cyan}}>{`<`}</span>
        <span
          style={{
            color: isComponent ? colors.yellow : colors.red,
            fontWeight: isComponent ? 'bold' : '',
          }}
        >
          {children.replace(/[<\s/>]/g, '')}
        </span>
        <span style={{color: colors.cyan}}>{`>`}</span>
      </code>
    );
  }

  // function call + punctuation
  if (children.endsWith('()')) {
    return (
      <code>
        <span style={{color: colors.skyBlue}}>
          {children.replace('()', '')}
        </span>
        <span style={{color: colors.lightGray}}>{`()`}</span>
      </code>
    );
  }

  // strings with punctuation
  if (
    [
      ...['top', 'right', 'bottom', 'left'].reduce(
        (acc, x) => acc.concat([x, `${x}-start`, `${x}-end`]),
        []
      ),
      'clippingParents',
      'viewport',
      'document',
      'bestFit',
      'initialPlacement',
      'reference',
      'floating',
      'fixed',
    ].includes(children)
  ) {
    return (
      <code>
        <span style={{color: colors.cyan}}>'</span>
        <span style={{color: colors.green}}>{children}</span>
        <span style={{color: colors.cyan}}>'</span>
      </code>
    );
  }

  let color = '';
  switch (true) {
    // keyword
    case /^(async|await)$/.test(children):
      color = colors.purple;
      break;
    // function
    case /^(shift|flip|offset|arrow|limitShift|hide|size|autoPlacement|computePosition|detectOverflow|getBoundingClientRect|fn|requestAnimationFrame|getScrollParents)$/.test(
      children
    ):
      color = colors.blue;
      break;
    // object literal property
    case /^(placement|name|data|middleware|reset|skip|flipAlignment|mainAxis|crossAxis|padding|elementContext|altBoundary|boundary|rootBoundary|strategy|platform|alignment|sameScrollView|element)$/.test(
      children
    ):
      color = colors.teal;
      break;
    // params
    case /^(x|y|middleware(Data|Arguments))$/.test(children):
      color = colors.pink;
      break;
    // boolean
    case /^(true|false|\d+$)/.test(children):
      color = colors.orange;
      break;
    // constant
    case /^(overflow|refs|scrollProps|showEvents|hideEvents)$/.test(
      children
    ):
      color = colors.lightRed;
      break;
    default:
  }

  return (
    <code {...props} style={{color}}>
      {children}
    </code>
  );
};
