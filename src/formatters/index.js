import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'stylish':
      return (data) => stylish(data);
    case 'plain':
      return (data) => plain(data);
    case 'json':
      return (data) => json(data);
    default:
      throw new Error(`Unknown formatName: '${formatName}'!`);
  }
};

export default getFormatter;
