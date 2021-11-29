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
        color: '#818abf',
        fontStyle: 'italic',
      },
    },
    {
      types: ['punctuation', 'operator', 'combinator', 'module'],
      style: {
        color: '#87e1fc',
      },
    },
    {
      types: [
        'tag',
        'namespace',
        'number',
        'unit',
        'hexcode',
        'deleted',
      ],
      style: {
        color: '#ff6569',
      },
    },
    {
      types: ['literal-property'],
      style: {
        color: '#4fd6be',
      },
    },
    {
      types: ['nil'],
      style: {
        color: '#7a808a',
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
        color: '#3cc1d7',
      },
    },
    {
      types: ['function-name'],
      style: {
        color: '#6196cc',
      },
    },
    {
      types: ['dom', 'variable', 'class'],
      style: {
        color: 'rgb(255, 192, 124)',
      },
    },
    {
      types: ['selector-id', 'function', 'property'],
      style: {
        color: '#85a9ff',
      },
    },
    {
      types: ['boolean'],
      style: {
        color: '#ff895b',
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
        color: 'rgb(255, 192, 124)',
      },
    },
    {
      types: ['constant', 'symbol'],
      style: {
        color: '#ff9fb1',
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
        color: '#c096ff',
      },
    },
    {
      types: ['string', 'char', 'attr-value', 'regex'],
      style: {
        color: '#cff894',
      },
    },
    {
      types: ['parameter'],
      style: {
        color: '#fca7ea',
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
