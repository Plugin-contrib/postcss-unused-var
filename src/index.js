import * as postcss from 'postcss';
import { transformer as unitTransformer } from './units';
import { transformer as selectorTransformer } from './selector';

export default postcss.plugin('postcss-lowercase-props-selectors', () => {
  return (css) => {
    css.walkRules((rule) => {
      rule.walkDecls((decl) => {
        // handling properties
        // All properties of CSS are case-insensitive. SAFE to transform
        decl.prop = decl.prop.toLowerCase();
      });

      // Handling selectors
      rule.selector = selectorTransformer(rule.selector);

      // Handling value's units
      rule.nodes = rule.nodes.map((node) => {
        node.value = unitTransformer(node.value);
        return node;
      });
    });
  };
});
