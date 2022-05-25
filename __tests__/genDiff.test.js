import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

// let expectedResultStylish;

const originalResultPath = getFixturePath('expect-result-original.txt');
const expectedResultOriginal = readFile(originalResultPath);

test.each([
  { fileName1: 'file1A.json', fileName2: 'file2A.json', expected: expectedResultOriginal },
  // { fileName1: 'file1.yaml', fileName2: 'file2.yaml', expected: expectedResultOriginal },
])('comparing files in stylish format', ({ fileName1, fileName2, expected }) => {
  const file1Path = getFixturePath(fileName1);
  const file2Path = getFixturePath(fileName2);
  expect(genDiff(file1Path, file2Path)).toEqual(expected);
});
