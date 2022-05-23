import _ from 'lodash';

const calcDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const diffs = keys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      return { ...acc, [key]: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { ...acc, [key]: 'deleted' };
    }

    if (_.isObject(obj1[key]) && !_.isArray(obj1[key])
      && _.isObject(obj2[key]) && !_.isArray(obj2[key])) {
      return { ...acc, [key]: calcDiff(obj1[key], obj2[key]) };
    }
    if (obj1[key] !== obj2[key]) {
      return { ...acc, [key]: 'changed' };
    }
    return { ...acc, [key]: 'unchanged' };
  }, {});
  return diffs;
};

export default calcDiff;
