import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// console.log(__filename);
// /Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Project-2/
// frontend-project-lvl2/__tests__/genDiff.test.js

// console.log(__dirname);
// /Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Project-2/
// frontend-project-lvl2/__tests__

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test.each([
  { fileName1: 'file1.json', fileName2: 'file2.json', expected: result },
  { fileName1: 'file1.yaml', fileName2: 'file2.yaml', expected: result },
])('comparing flat files', ({ fileName1, fileName2, expected }) => {
  const file1Path = getFixturePath(fileName1);
  const file2Path = getFixturePath(fileName2);
  expect(genDiff(file1Path, file2Path)).toEqual(expected);
});
