import _ from 'lodash';

const buildTreeNode = (key, val, state) => {
  const diffTreeNode = {
    key,
    state,
    val,
  };

  return diffTreeNode;
};

const processObjectsKey = (obj1, obj2, key, buildDiffTreeFunc) => {
  if (!_.has(obj1, key)) {
    return buildTreeNode(key, obj2[key], 'added');
  }
  if (!_.has(obj2, key)) {
    return buildTreeNode(key, obj1[key], 'deleted');
  }
  if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
    return buildTreeNode(key, buildDiffTreeFunc(obj1[key], obj2[key]), 'diffSubTree');
  }
  if (obj1[key] !== obj2[key]) {
    return buildTreeNode(key, [
      buildTreeNode(key, obj1[key], 'deleted'),
      buildTreeNode(key, obj2[key], 'added'),
    ], 'updated');
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
