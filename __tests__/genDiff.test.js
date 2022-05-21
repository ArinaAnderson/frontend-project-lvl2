import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// console.log(__filename);
// /Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Project-2/frontend-project-lvl2/__tests__/genDiff.test.js
// console.log(__dirname);
// /Users/marinalex/MY-FOLDERS/Gvenya-prog/2021-2022/HEXLET/Project-2/frontend-project-lvl2/__tests__

/*
test('comparing flat files', () => {
  const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  expect(genDiff(file1Path, file2Path)).toEqual(result);
});
*/

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;


test('comparing flat json files', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  expect(genDiff(file1Path, file2Path)).toEqual(result);
});

test('comparing flat yaml files', () => {
  const file1Path = getFixturePath('file1.yaml');
  const file2Path = getFixturePath('file2.yaml');
  expect(genDiff(file1Path, file2Path)).toEqual(result);
});
