import _ from 'lodash';

const isObject = (val) => _.isObject(val) && !_.isArray(val);

const buildTreeNode = (key, val, state) => {
  const diffTreeNode = {
    key,
    state,
    val,
  };
  /*
  diffTreeNode.key = key;
  diffTreeNode.state = state;
  diffTreeNode.val = val;
  */

  return diffTreeNode;
};

const processObjectsKey = (obj1, obj2, key, fn) => {
  if (!_.has(obj1, key)) {
    return buildTreeNode(key, obj2[key], 'added');
  }
  if (!_.has(obj2, key)) {
    return buildTreeNode(key, obj1[key], 'deleted');
  }
  if (isObject(obj1[key]) && isObject(obj2[key])) {
    return buildTreeNode(key, fn(obj1[key], obj2[key]), 'diffSubTree');
  }
  if (obj1[key] !== obj2[key]) {
    return [
      buildTreeNode(key, obj1[key], 'deleted'),
      buildTreeNode(key, obj2[key], 'added'),
    ];
  }
  return buildTreeNode(key, obj1[key], 'unchanged');
};

const buildDiffTree = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const diffTree = keys.map((key) => processObjectsKey(obj1, obj2, key, buildDiffTree));

  return diffTree.flat();
};

export default buildDiffTree;
