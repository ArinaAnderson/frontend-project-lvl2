import _ from 'lodash';

const calcDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));
  // const sortedKeys = _.sortBy();
  /*
  const diffs = keys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      acc[`+ ${key}`] = obj2[key];
    } else if (!_.has(obj2, key)) {
      acc[`- ${key}`] = obj1[key];
    } else if (obj1[key] !== obj2[key]) {
      acc[`- ${key}`] = obj1[key];
      acc[`+ ${key}`] = obj2[key];
    } else {
      acc[`  ${key}`] = obj1[key];;
    }
    return acc;
  }, {});
  */
  const diffs = keys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      return { ...acc, [key]: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { ...acc, [key]: 'deleted' };
    }
    if (obj1[key] !== obj2[key]) {
        return { ...acc, [key]: 'changed' };
    }
    return { ...acc, [key]: 'unchanged' };
  }, {});
  return diffs;
};

export default calcDiff;
