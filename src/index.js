import fs from 'fs';
import path from 'path';
import defineParser from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import getFormatter from './formatters/index.js';

const getAbsoluteFilePath = (fileName) => path.resolve(process.cwd(), fileName);
const readFileContent = (filePath) => fs.readFileSync(filePath, 'utf-8');

const genDiff = (file1, file2, formatName = 'stylish') => {
  const absoluteFile1Path = getAbsoluteFilePath(file1);
  const absoluteFile2Path = getAbsoluteFilePath(file2);

  const file1Format = path.extname(absoluteFile1Path);
  const file2Format = path.extname(absoluteFile2Path);

  const file1Content = readFileContent(absoluteFile1Path);
  const file2Content = readFileContent(absoluteFile2Path);

  const obj1 = defineParser(file1Format)(file1Content);
  const obj2 = defineParser(file2Format)(file2Content);
  /*
  const obj1 = defineParser(absoluteFile1Path)(file1Content);
  const obj2 = defineParser(absoluteFile2Path)(file2Content);
  */

  const diffsObj = buildDiffTree(obj1, obj2);

  const format = getFormatter(formatName);

  const result = format(diffsObj);
  return result;
};

export default genDiff;
