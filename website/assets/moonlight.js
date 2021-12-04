export const colors = {
  indigo: '#818abf',
  cyan: '#87e1fc',
  red: '#ff6569',
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
};

export const theme = {
  styles: [
    {
      types: [
        'comment',
        'block-comment',
        'prolog',
        'doctype',
        'cdata',
      ],
      style: {
        color: colors.indigo,
        fontStyle: 'italic',
      },
    },
    {
      types: ['punctuation', 'operator', 'combinator', 'module'],
      style: {
        color: colors.cyan,
      },
    },
    {
      types: ['tag', 'namespace', 'unit', 'hexcode', 'deleted'],
      style: {
        color: colors.red,
      },
    },
    {
      types: ['literal-property'],
      style: {
        color: colors.teal,
      },
    },
    {
      types: ['nil'],
      style: {
        color: colors.gray,
      },
    },
    {
      types: ['selector'],
      style: {
        color: '#72f1b8',
        textShadow:
          '0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475',
      },
    },
    {
      types: ['method'],
      style: {
        color: colors.skyBlue,
      },
    },
    {
      types: ['function-name'],
      style: {
        color: colors.blue,
      },
    },
    {
      types: ['dom', 'variable', 'class'],
      style: {
        color: colors.yellow,
      },
    },
    {
      types: ['selector-id', 'function', 'property'],
      style: {
        color: '#85a9ff',
      },
    },
    {
      types: ['boolean', 'number'],
      style: {
        color: colors.orange,
      },
    },
    {
      types: [
        'class-name',
        'maybe-class-name',
        'builtin',
        'object',
      ],
      style: {
        // color: '#ffedb8',
        // textShadow:
        //   'rgb(0, 0, 0) 0px 0px 5px, rgb(223, 146, 0) 0px 0px 15px, rgba(252, 93, 31, 0.46) 0px 0px 5px, rgb(0, 0, 0) 0px 0px 25px',
        fontWeight: 'bold',
        color: colors.yellow,
      },
    },
    {
      types: ['constant', 'symbol'],
      style: {
        color: colors.lightRed,
        textShadow:
          '0 0 2px #9f0000, 0 0 5px #dc078e33, 0 0 10px #fff3',
      },
    },
    {
      types: [
        'important',
        'atrule',
        'keyword',
        'arrow',
        'attr-name',
        'selector-class',
      ],
      style: {
        color: colors.purple,
      },
    },
    {
      types: ['string', 'char', 'attr-value', 'regex'],
      style: {
        color: colors.green,
      },
    },
    {
      types: ['parameter'],
      style: {
        color: colors.pink,
      },
    },
    {
      types: ['entity', 'url'],
      style: {
        color: '#67cdcc',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['entity'],
      style: {
        cursor: 'help',
      },
    },
    {
      types: ['inserted'],
      style: {
        color: 'green',
      },
    },
  ],
};
