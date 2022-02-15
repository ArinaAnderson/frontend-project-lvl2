import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import genDiffString from './src/genDiffString.js';

const getFilePath = (fileName) => path.resolve(process.cwd(), '__fixtures__', fileName);

const readFileContent = (filePath) => fs.readFileSync(filePath, 'utf-8');

const isJSON = (fileName) => path.extname(fileName) === '.json';

/*
const parseData = (fileName) => { // here pass dataright away -- datathat was read from a file
  const filePath = getFilePath(fileName);
  const fileContent = getFileContent(filePath);
  if (isJSON(fileName)) {
    return JSON.parse(fileContent);
  }
};
*/

const parseData = (fileName, fileData) => {
  if (isJSON(fileName)) {
    return JSON.parse(fileData);
  }
};

const genDiff = (file1, file2) => {
  const file1Path = getFilePath(file1);
  const file2Path = getFilePath(file2);
  const file1Content = readFileContent(file1Path);
  const file2Content = readFileContent(file2Path);
  const data1 = parseData(file1Path, file1Content);
  const data2 = parseData(file2Path, file2Content);

  return genDiffString(data1, data2);
};

export default genDiff;
