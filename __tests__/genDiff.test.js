import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const stylishResultPath = getFixturePath('expect-result-stylish.txt');
const expectedStylish = readFile(stylishResultPath);

const plainResultPath = getFixturePath('expect-result-plain.txt');
const expectedPlain = readFile(plainResultPath);

const jsonResultPath = getFixturePath('expect-result-json.json');
const expectedJSON = readFile(jsonResultPath);

const json1Path = getFixturePath('file1.json');
const json2Path = getFixturePath('file2.json');
const yaml1Path = getFixturePath('file1.yaml');
const yaml2Path = getFixturePath('file2.yaml');

test.each([
  { path1: json1Path, path2: json2Path, expected: expectedStylish },
  { path1: yaml1Path, path2: yaml2Path, expected: expectedStylish },
])('comparing files in stylish format by default', ({ path1, path2, expected }) => {
  expect(genDiff(path1, path2)).toEqual(expected);
});

test.each([
  {
    path1: json1Path,
    path2: json2Path,
  },
  {
    path1: yaml1Path,
    path2: yaml2Path,
  },
  {
    path1: yaml1Path,
    path2: yaml2Path,
  },
])('comparing files when parameter formatName is passed', ({
  path1, path2,
}) => {
  expect(genDiff(path1, path2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(path1, path2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(path1, path2, 'json')).toEqual(expectedJSON);
});
