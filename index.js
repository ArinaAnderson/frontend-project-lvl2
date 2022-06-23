import fs from 'fs';
import path from 'path';
import defineParser from './src/parsers.js';
import buildDiffTree from './src/buildDiffTree.js';
import formatStylish from './src/formatStylish.js';

const getAbsoluteFilePath = (fileName) => path.resolve(process.cwd(), fileName);
const readFileContent = (filePath) => fs.readFileSync(filePath, 'utf-8');

const genDiff = (file1, file2, format = 'stylish') => { // format = 'stylish') => {
  const absoluteFile1Path = getAbsoluteFilePath(file1);
  const absoluteFile2Path = getAbsoluteFilePath(file2);

  const file1Content = readFileContent(absoluteFile1Path);
  const file2Content = readFileContent(absoluteFile2Path);

  const obj1 = defineParser(absoluteFile1Path)(file1Content);
  const obj2 = defineParser(absoluteFile2Path)(file2Content);

  const diffsObj = buildDiffTree(obj1, obj2);

  const result = formatStylish(diffsObj);
  return result;
};

export default genDiff;
