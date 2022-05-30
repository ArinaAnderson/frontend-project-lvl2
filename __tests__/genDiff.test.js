import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const stylishResultPath = getFixturePath('expect-result-stylish.txt');
const expectedResultStylish = readFile(stylishResultPath);

test.each([
  { fileName1: 'file1.json', fileName2: 'file2.json', expected: expectedResultStylish },
  { fileName1: 'file1.yaml', fileName2: 'file2.yaml', expected: expectedResultStylish },
])('comparing files in stylish format', ({ fileName1, fileName2, expected }) => {
  const file1Path = getFixturePath(fileName1);
  const file2Path = getFixturePath(fileName2);
  expect(genDiff(file1Path, file2Path)).toBe(expected);
});
