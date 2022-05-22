import fs from 'fs';
import path from 'path';
import defineParser from './src/parsers.js';
import calcDiff from './src/calcDiff.js';
import stringify from './src/stringify.js';

const getAbsoluteFilePath = (fileName) => path.resolve(process.cwd(), fileName);
const readFileContent = (filePath) => fs.readFileSync(filePath, 'utf-8');

const genDiff = (file1, file2) => {
  const absoluteFile1Path = getAbsoluteFilePath(file1);
  const absoluteFile2Path = getAbsoluteFilePath(file2);

  const file1Content = readFileContent(absoluteFile1Path);
  const file2Content = readFileContent(absoluteFile2Path);

  const obj1 = defineParser(absoluteFile1Path)(file1Content);
  const obj2 = defineParser(absoluteFile2Path)(file2Content);

  const diffsObj = calcDiff(obj1, obj2);

  const result = stringify(obj1, obj2, diffsObj);
  return result;
};

export default genDiff;
