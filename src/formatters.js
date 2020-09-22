import stylish from './formatters/stylish.js';

const getFormatter = (name) => {
  switch (name) {
    default:
      return stylish;
  }
};

export default getFormatter;
