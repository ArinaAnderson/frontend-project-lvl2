import _ from 'lodash';
import calcDiff from './calcDiff.js';

const genDiffString = (obj1, obj2) => {
  const diffs = calcDiff(obj1, obj2);
  const keys = _.keys(diffs);
  const sortedKeys = keys.sort();

  // const diffsString = sortedKeys.reduce((acc, key) => {
  // }, '{');
  const newVals = sortedKeys.map((key) => {
    if (diffs[key] === 'added') {
      return [`  + ${key}: ${obj2[key]}`];
    }
    if (diffs[key] === 'deleted') {
      return [`  - ${key}: ${obj1[key]}`];
    }
    if (diffs[key] === 'changed') {
      return [`  - ${key}: ${obj1[key]}`, `  + ${key}: ${obj2[key]}`];
    }
    return [`    ${key}: ${obj1[key]}`];
  });
  const res = newVals.flat().join('\n');
  return `{\n${res}\n}`;
};

export default genDiffString;
