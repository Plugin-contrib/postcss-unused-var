import * as postcss from 'postcss';
import { transformer as unitTransformer } from './units';

const TransformSelectors = (selector) => {
  let selectorsArray = selector.split(',');
  let selectors = selectorsArray
    .map((sel) => sel.trim())
    .map((sel) => {
      let tmpSel = sel.split(' ');
      tmpSel = tmpSel.map((tmsl) => {
        // check whether its a pure class or id selector
        if (!/[\.#]/g.test(tmsl)) {
          // --> if not, its html tag selector, SAFE TO TRANSFORM
          return tmsl.toLowerCase();
        }

        // check whether HTML tag selector has any followup selectors or not, like class or id
        // not checking for followup HTML selector as it will be taken care in the next iteration

        // check whether it has "." or "#" in the middle of the string
        if (/[A-Za-z0-9]+[\.#][A-Za-z0-9]+/g.test(tmsl)) {
          // ----> if yes,
          // check if it is having begining with class or id
          if (/[\.#]/g.test(tmsl.charAt(0))) {
            // ------->  if yes, no transformation
            return tmsl;
          }

          // -------> if no, SAFELY transform everything before the midde '.' or '#'
          let delimiter = /[A-Za-z0-9]+[\.][A-Za-z0-9]+/.test(tmsl) ? '.' : '#';
          let selArray = tmsl.split(delimiter);
          selArray[0] = selArray[0].toLowerCase();
          return selArray.join(delimiter);
        }
        // --> if yes, no transform, simply return
        return tmsl;
      });
      return tmpSel.join(' ');
    })
    .join(',');
  return selectors;
};

export default postcss.plugin('postcss-lowercase-props-selectors', () => {
  return (css) => {
    css.walkRules((rule) => {
      rule.walkDecls((decl) => {
        // handling properties
        // All properties of CSS are case-insensitive. SAFE to transform
        decl.prop = decl.prop.toLowerCase();
      });

      // Handling selectors
      rule.selector = TransformSelectors(rule.selector);

      // Handling value's units
      rule.nodes = rule.nodes.map((node) => {
        node.value = unitTransformer(node.value);
        return node;
      });
    });
  };
});
