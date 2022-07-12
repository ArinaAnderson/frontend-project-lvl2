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

const replacer = ' ';

const statesToMarkers = {
  added: '+',
  deleted: '-',
  unchanged: replacer,
  diffSubTree: replacer,
};

const defineIndent = (indentSize, markerLength = 1) => {
  const indent = `${replacer.repeat(indentSize - markerLength - replacer.length)}`;
  return indent;
};

const createLine = (key, value, indent, marker) => `${indent}${marker}${replacer}${key}: ${value}`;

const turnNodesToLines = (nodes, defineLineVal, indent) => {
  const lines = nodes.map((node) => {
    if (node.state === 'updated') {
      return turnNodesToLines(node.val, defineLineVal, indent);
    }

    const marker = statesToMarkers[node.state];

    const line = createLine(node.key, defineLineVal(node), indent, marker);
    return line;
  });
  return lines;
};

const stylish = (diffsTree, indentBase = 4) => {
  const iter = (diffs, depth) => {
    const indent = defineIndent(depth * indentBase);
    const getLineContent = (node) => {
      if (node.state === 'diffSubTree') {
        return iter(node.val, depth + 1);
      }
      return stringify(node.val, indentBase, depth + 1);
    };
    const lines = turnNodesToLines(diffs, getLineContent, indent);

    return `{\n${lines.flat().join('\n')}\n${replacer.repeat(depth * indentBase - indentBase)}}`;
  };

  return iter(diffsTree, 1);
};

export default stylish;
