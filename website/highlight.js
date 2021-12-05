const shiki = require('shiki');
const fs = require('fs');
const path = require('path');
const {JSDOM} = require('jsdom');

shiki
  .getHighlighter({
    theme: JSON.parse(
      fs.readFileSync(
        path.join(__dirname, 'assets', 'moonlight-ii.json'),
        'utf-8'
      )
    ),
  })
  .then((highlighter) => {
    const indexHtml = path.join(__dirname, 'out', 'index.html');
    const content = fs.readFileSync(indexHtml, 'utf-8');

    const dom = new JSDOM(content);
    dom.window.document
      .querySelectorAll('pre > code')
      .forEach((codeBlock) => {
        codeBlock.innerHTML = highlighter.codeToHtml(
          codeBlock.innerHTML,
          'js'
        );
      });

    fs.writeFileSync(indexHtml, dom.serialize());
  });
