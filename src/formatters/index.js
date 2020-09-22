import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (name) => {
  switch (name) {
    case 'plain':
      return plain;
    default:
      return stylish;
  }
};

export default getFormatter;
