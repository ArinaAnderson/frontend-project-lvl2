import _ from 'lodash';

const startLine = (keyPath) => `Property '${keyPath}' was`;

const processVal = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }

  if (_.isString(val)) {
    return `'${val}'`;
  }

  return val;
};

const iterDiffs = (diffs, parentKey = '') => {
  const lines = diffs.map((node, idx) => {
    const { key, state, val } = node;
    const keyPath = `${parentKey}${parentKey ? '.' : ''}${key}`;
    const lineStart = startLine(keyPath);

    if (state === 'diffSubTree') {
      return iterDiffs(val, keyPath);
    }

    if (diffs[idx + 1] && key === diffs[idx + 1].key) {
      return [];
    }

    if (diffs[idx - 1] && key === diffs[idx - 1].key) {
      return `${lineStart} updated. From ${processVal(diffs[idx - 1].val)} to ${processVal(val)}`;
    }

    if (state === 'added') {
      return `${lineStart} added with value: ${processVal(val)}`;
    }

    if (state === 'deleted') {
      return `${lineStart} removed`;
    }

    return [];
  });
  return `${lines.flat().join('\n')}`;
};

const plain = (diffsTree) => iterDiffs(diffsTree);

export default plain;
