import path from 'path';
import yaml from 'js-yaml';

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

export default defineParser;
