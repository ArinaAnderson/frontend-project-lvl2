import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

// console.log(__filename);
// /Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Project-2/
// frontend-project-lvl2/__tests__/genDiff.test.js

// console.log(__dirname);
// /Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Project-2/
// frontend-project-lvl2/__tests__

let expectedResultStylish;
let expectedResultOriginal;
/*
const stylishResultPath = getFixturePath('expect-result-original.txt');
expectedResultOriginal = readFile(stylishResultPath);
*/

beforeAll(() => {
  const originalResultPath = getFixturePath('expect-result-original.txt');
  expectedResultOriginal = readFile(originalResultPath);
});


test.each([
  { fileName1: 'file1A.json', fileName2: 'file2A.json', expected: expectedResultOriginal },
  // { fileName1: 'file1.yaml', fileName2: 'file2.yaml', expected: expectedResultOriginal },
])('comparing files in stylish format', ({ fileName1, fileName2, expected }) => {
  const file1Path = getFixturePath(fileName1);
  const file2Path = getFixturePath(fileName2);
  expect(genDiff(file1Path, file2Path)).toEqual(expected);
});

/*
test('compare files', () => {
  const file1Path = getFixturePath('file1A.json');
  const file2Path = getFixturePath('file2A.json');
  expect(genDiff(file1Path, file2Path)).toEqual(expectedResultOriginal);
});
*/
