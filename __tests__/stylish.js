import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import stylish from '../src/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

let diffTreeObj;
let expectedResult;

beforeAll(() => {
  const diffTreePath = getFixturePath('expect-result-diffTree.json');
  const expectedResultPath = getFixturePath('expect-result-stylish.txt');
  diffTreeObj = JSON.parse(readFile(diffTreePath));
  expectedResult = readFile(expectedResultPath);
});

test('gets stylish format of diffTree', () => {
  const actual = stylish(diffTreeObj);
  expect(actual).toEqual(expectedResult);
});
