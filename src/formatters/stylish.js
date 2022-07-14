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

const defineIndent = (indentSize, replacer, markerLength = 2) => {
  const indent = `${replacer.repeat(indentSize - markerLength)}`;
  return indent;
};

const createLine = (key, value, indent, marker) => `${indent}${marker}${key}: ${value}`;

const stylish = (diffsTree, indentBase = 4, replacer = ' ') => {
  const iter = (diffs, depth) => {
    const indent = defineIndent(depth * indentBase, replacer);
    const lines = diffs.map((node) => {
      const { key, val, state } = node;
      switch (state) {
        case 'updated':
          return [
            createLine(key, stringify(val[0].val, indentBase, depth + 1), indent, `-${replacer}`),
            createLine(key, stringify(val[1].val, indentBase, depth + 1), indent, `+${replacer}`),
          ];
        case 'deleted':
          return createLine(key, stringify(val, indentBase, depth + 1), indent, `-${replacer}`);
        case 'added':
          return createLine(key, stringify(val, indentBase, depth + 1), indent, `+${replacer}`);
        case 'unchanged':
          return createLine(key, stringify(val, indentBase, depth + 1), indent, `${replacer}${replacer}`);
        case 'diffSubTree':
          return createLine(key, iter(val, depth + 1), indent, `${replacer}${replacer}`);
        default:
          throw new Error(`Unknown state: '${state}'!`);
      }
    });

    return `{\n${lines.flat().join('\n')}\n${replacer.repeat(depth * indentBase - indentBase)}}`;
  };

  return iter(diffsTree, 1);
};

export default stylish;
