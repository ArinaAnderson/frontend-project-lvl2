import yaml from 'js-yaml';

const parse = (dataFormat, data) => {
  switch (dataFormat) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data, 'utf8');
    default:
      throw new Error(`Unknown format: '${dataFormat}'!`);
  }
};

export default parse;
