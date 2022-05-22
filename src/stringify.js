import _ from 'lodash';
// import calcDiff from './calcDiff.js';

// const stringify = (obj1, obj2) => {
  // const diffs = calcDiff(obj1, obj2);
  // const keys = _.keys(diffs);
const stringify = (obj1, obj2, diffsObj) => {
  const keys = _.keys(diffsObj);
  const sortedKeys = keys.sort();

  const newVals = sortedKeys.map((key) => {
    if (diffsObj[key] === 'added') {
      return [`  + ${key}: ${obj2[key]}`];
    }
    if (diffsObj[key] === 'deleted') {
      return [`  - ${key}: ${obj1[key]}`];
    }
    if (diffsObj[key] === 'changed') {
      return [`  - ${key}: ${obj1[key]}`, `  + ${key}: ${obj2[key]}`];
    }
    return [`    ${key}: ${obj1[key]}`];
  });
  const res = newVals.flat().join('\n');
  return `{\n${res}\n}`;
};

export default stringify;
