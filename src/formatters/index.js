import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish: function (data) {
    return stylish(data);
  },
  plain: function (data) {
    return plain(data);
  },
  json: function (data) {
    return json(data);
  },
};

const getFormat = (formatName) => {
  if (!_.has(formatters, formatName)) {
    throw new Error(`Unknown formatName: '${formatName}'!`);
  }
  return formatters[formatName];
};

export default getFormat;
