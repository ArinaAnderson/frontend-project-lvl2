// import path from 'path';
import yaml from 'js-yaml';

const defineParser = (dataFormat) => {
  switch (dataFormat) {
    case '.json':
      return (data) => JSON.parse(data);
    case '.yaml':
    case '.yml':
      return (data) => yaml.load(data, 'utf8');
    default:
      throw new Error(`Unknown format: '${dataFormat}'!`);
  }
};

export default defineParser;
