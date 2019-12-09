var postcss = require('postcss');
var plugin = require('..');

function run(testMsg = 'should work', input, output) {
  it(testMsg, (done) => {
    let result = postcss([plugin.default()]).process(input, {
      from: undefined,
    });
    expect(result.css).toEqual(output);
    done();
  });
}

describe('transforming CSS properties', () => {
  run(
    'should safely transform the  CSS  Properties to lowercase : BORDER',
    '#main{BORDER: 1px solid black;}',
    '#main{border: 1px solid black;}'
  );
  run(
    'should safely transform the  CSS  Properties to lowercase : BACKGROUND-COLOR',
    '#main{BACKGROUND-COLOR: black;}',
    '#main{background-color: black;}'
  );
});

describe('transforming CSS selectors', () => {
  run(
    'should safely transform the  CSS id Selectors to lowercase ',
    '#main{border: 1px solid black;}',
    '#main{border: 1px solid black;}'
  );

  run(
    'should safely transform the  CSS class Selectors to lowercase',
    '.main{border: 1px solid black;}',
    '.main{border: 1px solid black;}'
  );

  run(
    'should safely transform the CSS HTML tag Selectors to lowercase',
    'LI{border: 1px solid black;}',
    'li{border: 1px solid black;}'
  );

  run(
    'no transform to lowercase required',
    'li{border: 1px solid black;}',
    'li{border: 1px solid black;}'
  );

  run(
    'should safely transform the  CSS caps multiple HTML Selectors to lowercase',
    'UL LI{border: 1px solid black;}',
    'ul li{border: 1px solid black;}'
  );

  run(
    'should safely transform the  CSS HTML Selectors to lowercase',
    'UL LI, p A{border: 1px solid black;}',
    'ul li,p a{border: 1px solid black;}'
  );

  run(
    'should safely transform the  CSS HTML Selectors followed by id to lowercase',
    'LI#idname{border: 1px solid black;}',
    'li#idname{border: 1px solid black;}'
  );
  run(
    'should safely transform the  CSS HTML Selectors followed by class to lowercase',
    'LI.classname{border: 1px solid black;}',
    'li.classname{border: 1px solid black;}'
  );

  run(
    'should safely transform the  CSS nested classname  Selectors to lowercase',
    'classname{border: 1px solid black;}',
    'classname{border: 1px solid black;}'
  );
});
describe('transforming CSS units', () => {
  run(
    'should safely transform the absolute units to lowercase : px',
    'classname{border: 1PX solid black;}',
    'classname{border: 1px solid black;}'
  );

  run(
    'should safely transform the absolute units to lowercase : em',
    '#idname{padding: 1EM 2EM;}',
    '#idname{padding: 1em 2em;}'
  );

  run(
    'should safely transform the angle units to lowercase : deg',
    '#idname{transform : rotate(20DEG);}',
    '#idname{transform : rotate(20deg);}'
  );

  run(
    'should safely transform the Frequency units to lowercase of ',
    'p.low { pitch: 105HZ; }',
    'p.low { pitch: 105hz; }'
  );
});
