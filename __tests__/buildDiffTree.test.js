import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import buildDiffTree from '../src/buildDiffTree.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

let obj1;
let obj2;
let expectedResult;

beforeAll(() => {
  const obj1Path = getFixturePath('file1.json');
  const obj2Path = getFixturePath('file2.json');
  const expectedResultPath = getFixturePath('expect-result-diffTree.json');
  obj1 = JSON.parse(readFile(obj1Path));
  obj2 = JSON.parse(readFile(obj2Path));
  expectedResult = JSON.parse(readFile(expectedResultPath));
});

test('compares nested objects', () => {
  const actual = buildDiffTree(obj1, obj2);
  expect(actual).toEqual(expectedResult);
});
