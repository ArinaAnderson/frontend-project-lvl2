import _ from 'lodash';
import path from 'path';
import yaml from 'js-yaml';

const parsers = {
  json(fileContent) {
    return JSON.parse(fileContent);
  },
  yaml(fileContent) {
    return yaml.load(fileContent, 'utf8');
  },
  yml(fileContent) {
    return yaml.load(fileContent, 'utf8');
  },
};

const defineParser = (filePath) => {
  const extension = path.extname(filePath).substring(1);
  if (!_.has(parsers, extension)) {
    throw new Error(`Unknown extansion: '${extension}'!`);
  }
  return parsers[extension];
};

/*
const defineParser = (filePath) => {
  const format = path.extname(filePath);
  switch (format) {
    case '.json':
      return (fileContent) => JSON.parse(fileContent);
    case '.yaml':
    case '.yml':
      return (fileContent) => yaml.load(fileContent, 'utf8');
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};
*/

export default defineParser;
