import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import getFormatter from './formatters/index.js';

const getAbsoluteFilePath = (fileName) => path.resolve(process.cwd(), fileName);
const readFileContent = (filePath) => fs.readFileSync(filePath, 'utf-8');

const genDiff = (file1, file2, formatName = 'stylish') => {
  const absoluteFile1Path = getAbsoluteFilePath(file1);
  const absoluteFile2Path = getAbsoluteFilePath(file2);

  const file1Format = path.extname(absoluteFile1Path).substring(1);
  const file2Format = path.extname(absoluteFile2Path).substring(1);

  const file1Content = readFileContent(absoluteFile1Path);
  const file2Content = readFileContent(absoluteFile2Path);

  const obj1 = parse(file1Format, file1Content);
  const obj2 = parse(file2Format, file2Content);

  const diffsObj = buildDiffTree(obj1, obj2);

  const format = getFormatter(formatName);

  const result = format(diffsObj);
  return result;
};

export default genDiff;
