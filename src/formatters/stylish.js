import _ from 'lodash';

const stringify = (value, indentBase = 4, depth = 1, replacer = ' ') => {
  const iter = (val, indent) => {
    if (!_.isObject(val)) {
      return `${val}`;
    }

    const keys = _.keys(val);
    const arr = keys.map((key) => `${replacer.repeat(indent)}${key}: ${iter(val[key], indent + indentBase)}`);
    const result = arr.join('\n');
    return `{\n${result}\n${replacer.repeat(indent - indentBase)}}`;
  };
  return iter(value, depth * indentBase);
};

const defineMarker = (state, replacer) => {
  const generalMarker = `${replacer}${replacer}`;
  const plusMarker = `+${replacer}`;
  const minusMarker = `-${replacer}`;

  switch (state) {
    case 'added':
      return plusMarker;
    case 'deleted':
      return minusMarker;
    case 'unchanged':
    case 'diffSubTree':
      return generalMarker;
    default:
      throw new Error(`Unknown state: '${state}'!`);
  }
};
// lineIndent = lineMargin + lineMarker
const defineMargin = (indentSize, replacer, markerLength = 2) => {
  const margin = `${replacer.repeat(indentSize - markerLength)}`;
  return margin;
};

const defineIndent = (state, indentSize, replacer) => {
  const lineMarker = defineMarker(state, replacer);
  const lineMargin = defineMargin(indentSize, replacer, lineMarker.length);

  return `${lineMargin}${lineMarker}`;
};

const createLine = (key, value, indent) => `${indent}${key}: ${value}`;

const stylish = (diffsTree, indentBase = 4, replacer = ' ') => {
  const iter = (diffs, depth) => {
    const lines = diffs.map((node) => {
      const lineKey = node.key;
      const lineIndent = defineIndent(node.state, depth * indentBase, replacer);

      if (node.state === 'diffSubTree') {
        return createLine(lineKey, iter(node.val, depth + 1), lineIndent);
      }

      return createLine(lineKey, stringify(node.val, indentBase, depth + 1, replacer), lineIndent);
    });

    return `{\n${lines.join('\n')}\n${replacer.repeat(depth * indentBase - indentBase)}}`;
  };

  return iter(diffsTree, 1);
};

export default stylish;
