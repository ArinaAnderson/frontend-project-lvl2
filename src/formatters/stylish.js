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

const defineIndent = (indentSize, replacer, markerLength = 2) => {
  const indent = `${replacer.repeat(indentSize - markerLength)}`;
  return indent;
};

const createLine = (key, value, margin) => `${margin}${key}: ${value}`;

const stylish = (diffsTree, indentBase = 4, replacer = ' ') => {
  const iter = (diffs, depth) => {
    const indent = defineIndent(depth * indentBase, replacer);

    const lines = diffs.map((node) => {
      const lineKey = node.key;
      const lineMarker = defineMarker(node.state, replacer);
      const lineMargin = `${indent}${lineMarker}`;

      if (node.state === 'diffSubTree') {
        return createLine(lineKey, iter(node.val, depth + 1), lineMargin);
      }

      return createLine(lineKey, stringify(node.val, indentBase, depth + 1, replacer), lineMargin);
    });

    return `{\n${lines.join('\n')}\n${replacer.repeat(depth * indentBase - indentBase)}}`;
  };

  return iter(diffsTree, 1);
};

export default stylish;
