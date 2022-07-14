import _ from 'lodash';

const startLine = (keyPath) => `Property '${keyPath}' was`;

const stringify = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }

  if (_.isString(val)) {
    return `'${val}'`;
  }

  return `${val}`;
};

const iterDiffs = (diffs, parentKey = '') => {
  const lines = diffs.map((node) => {
    const { key, state, val } = node;
    const keyPath = `${parentKey}${parentKey ? '.' : ''}${key}`;
    const lineStart = startLine(keyPath);

    switch (state) {
      case 'diffSubTree':
        return iterDiffs(val, keyPath);

      case 'updated':
        return `${lineStart} updated. From ${stringify(val[0].val)} to ${stringify(val[1].val)}`;

      case 'added':
        return `${lineStart} added with value: ${stringify(val)}`;

      case 'deleted':
        return `${lineStart} removed`;

      case 'unchanged':
        return [];

      default:
        throw new Error(`Unknown node state: '${state}'!`);
    }
  });
  return `${lines.flat().join('\n')}`;
};

const plain = (diffsTree) => iterDiffs(diffsTree);

export default plain;
