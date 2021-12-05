const visit = require('unist-util-visit');
const shiki = require('shiki');
const path = require('path');
const fs = require('fs');
const {JSDOM} = require('jsdom');
const rangeParser = require('parse-numeric-range');

module.exports = () =>
  async function transformer(tree) {
    const highlighter = await shiki.getHighlighter({
      theme: JSON.parse(
        fs.readFileSync(
          path.join(__dirname, 'assets', 'moonlight-ii.json'),
          'utf-8'
        )
      ),
    });

    const loadedLanguages = highlighter.getLoadedLanguages();
    const ignoreUnknownLanguage = true;

    visit(tree, 'code', visitor);

    function visitor(node) {
      const lang =
        ignoreUnknownLanguage &&
        !loadedLanguages.includes(node.lang)
          ? null
          : node.lang;

      const highlighted = highlighter.codeToHtml(
        node.value,
        lang
      );

      node.type = 'html';

      if (node.value.startsWith('npm install')) {
        const packageName = node.value.split('@floating-ui/')[1];
        node.value =
          '<pre><code><span>' +
          [
            `<span style="color:#86E1FC">npm install</span> `,
            `<span style="color:#C3E88D">@floating-ui/${packageName}</span>`,
          ].join('') +
          '</span></code></pre>';
        return;
      }

      if (node.value.startsWith('yarn add')) {
        const packageName = node.value.split('@floating-ui/')[1];
        node.value =
          '<pre><code><span>' +
          [
            `<span style="color:#86E1FC">yarn add</span> `,
            `<span style="color:#C3E88D">@floating-ui/${packageName}</span>`,
          ].join('') +
          '</span></code></pre>';
        return;
      }

      const numbers = node.meta
        ? rangeParser(node.meta.replace(/[{}]/g, ''))
        : [];

      const dom = new JSDOM(highlighted);
      dom.window.document.body
        .querySelectorAll('.line')
        .forEach((node, i) => {
          Object.assign(node.style, {
            display: 'block',
            minHeight: '1.5rem',
          });

          if (numbers.includes(i + 1)) {
            node.className = 'bg-gray-700 -mx-6 px-6';
          }
        });

      node.value = dom.serialize();
    }
  };
