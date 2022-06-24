import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import plain from '../src/formatters/plain.js';

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
