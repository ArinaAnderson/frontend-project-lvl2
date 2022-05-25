import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import calcDiff from '../src/calcDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

let obj1;
let obj2;

beforeAll(() => {
  const obj1Path = getFixturePath('file1.json');
  const obj2Path = getFixturePath('file2.json');
  obj1 = JSON.parse(readFile(obj1Path));
  obj2 = JSON.parse(readFile(obj2Path));
});

const expectedResult = {
  common: {
    follow: 'added',
    setting1: 'unchanged',
    setting2: 'deleted',
    setting3: 'changed',
    setting4: 'added',
    setting5: 'added',
    setting6: {
      key: 'unchanged',
      ops: 'added',
      doge: {
        wow: 'changed',
      },
    },
  },
  group1: {
    baz: 'changed',
    foo: 'unchanged',
    nest: 'changed',
  },
  group2: 'deleted',
  group3: 'added',
};

test('compares nested objects', () => {
  const actual = calcDiff(obj1, obj2);
  expect(actual).toEqual(expectedResult);
});
