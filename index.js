import { fstat, readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import genDiffString from './src/genDiffString.js';

const getFilePath = (fileName) => path.resolve(process.cwd(), fileName);

const getFileContent = (filePath) => fs.readFileSync(filePath, 'utf-8');

const isJSON = (fileName) => path.extname(fileName) === 'json';

const parseData = (fileName) => {
  const filePath = getFilePath(fileName);
  const fileContent = getFileContent(filePath);
  if (isJSON(fileName)) {
    return JSON.parse(fileContent);
  }
};

const genDiff = (file1, file2) => {
  const file1Path = getFilePath(file1);
  const file2Path = getFilePath(file2);

  const file1Content = getFileContent(file1Path);
  const file2Content = getFileContent(file2Path);

  return file2Content;
}; 
const genDiffTest = (data1, data2) => genDiffString(data1, data2);
// JSON.parse of data from files

export default genDiff;
