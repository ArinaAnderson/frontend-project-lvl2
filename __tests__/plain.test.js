import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import plain from '../src/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

/*
const resultPath = getFixturePath('expect-result-plain.txt');
const expectedResult = readFile(resultPath);
*/

let diffTreeObj;
let expectedResult;

beforeAll(() => {
  const diffTreePath = getFixturePath('expect-result-diffTree.json');
  const expectedResultPath = getFixturePath('expect-result-plain.txt');
  diffTreeObj = JSON.parse(readFile(diffTreePath));
  expectedResult = readFile(expectedResultPath);
});

test('gets plain format of diffTree', () => {
  const actual = plain(diffTreeObj);
  expect(actual).toEqual(expectedResult);
});

// console.log(expectedResult);//(JSON.stringify(diffTreeObj, null, '  '));
/*
test.each([
  { fileName1: 'file1.json', fileName2: 'file2.json', expected: expectedResult },
  // { fileName1: 'file1.yaml', fileName2: 'file2.yaml', expected: expectedResult },
])('comparing files in stylish format', ({ fileName1, fileName2, expected }) => {
  const diffTreePath = getFixturePath(fileName1);
  expect(plain(file1Path, file2Path)).toBe(expected);
});
*/
