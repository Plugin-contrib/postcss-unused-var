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

describe('removing un-used CSS variables', () => {
  run(
    'should safely unused variables ',
    '#div1 {--main-txt-color: blue; --main-padding: 15px; --main-bg-color: coral; background-color: var(--main-bg-color);}',
    '#div1 { --main-bg-color: coral; background-color: var(--main-bg-color);}'
  );
  run(
    'should not remove unused variables from :root ',
    ':root {--main-txt-color: blue; --main-padding: 15px; --main-bg-color: coral;} h1{background-color: var(--main-bg-color);}',
    ':root {--main-txt-color: blue; --main-padding: 15px; --main-bg-color: coral;} h1{background-color: var(--main-bg-color);}'
  );
});
