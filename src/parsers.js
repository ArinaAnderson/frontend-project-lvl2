import _ from 'lodash';
// import path from 'path';
import yaml from 'js-yaml';

const parsers = {
  json(data) {
    return JSON.parse(data);
  },
  yaml(data) {
    return yaml.load(data, 'utf8');
  },
  yml(data) {
    return yaml.load(data, 'utf8');
  },
};

const defineParser = (dataFormat) => {
  // const dataFormat = path.extname(dataName).substring(1);
  if (!_.has(parsers, dataFormat)) {
    throw new Error(`Unknown format: '${dataFormat}'!`);
  }
  return parsers[dataFormat];
};

export default defineParser;
