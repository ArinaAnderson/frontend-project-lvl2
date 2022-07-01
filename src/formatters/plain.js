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

const isNodeUpdated = (node, nextNode, prevNode) => (nextNode && node.key === nextNode.key)
  || (prevNode && node.key === prevNode.key);

const isNodeOld = (node, nextNode) => nextNode && node.key === nextNode.key;

// const mapCallback = (node, idx) => {};

const iterDiffs = (diffs, parentKey = '') => {
  const lines = diffs.map((node, idx) => {
    const { key, state, val } = node;
    const keyPath = `${parentKey}${parentKey ? '.' : ''}${key}`;
    const lineStart = startLine(keyPath);

    const prevNode = diffs[idx - 1];
    const nextNode = diffs[idx + 1];

    if (isNodeUpdated(node, nextNode, prevNode)) {
      return isNodeOld(node, nextNode)
        ? []
        : `${lineStart} updated. From ${processVal(prevNode.val)} to ${processVal(val)}`;
    }

    switch (state) {
      case 'diffSubTree':
        return iterDiffs(val, keyPath);

      case 'added':
        return `${lineStart} added with value: ${processVal(val)}`;

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
