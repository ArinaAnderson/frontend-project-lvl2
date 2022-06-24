import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish(data) {
    return stylish(data);
  },
  plain(data) {
    return plain(data);
  },
  /*
  json(data) {
    return json(data);
  },
  */
};

const getFormat = (formatName) => {
  if (!_.has(formatters, formatName)) {
    throw new Error(`Unknown formatName: '${formatName}'!`);
  }
  return formatters[formatName];
};

export default getFormat;
