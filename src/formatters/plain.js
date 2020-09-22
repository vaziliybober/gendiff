import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const formatDiff = (diffObj) => {
  const iter = (diff, path) => {
    const strings = Object.keys(diff).sort().map((key) => {
      const {
        status, value, valueBefore, valueAfter,
      } = diff[key];

      const fullPathString = [...path, key].join('.');

      if (status === 'added') {
        return `Property '${fullPathString}' was added with value: ${formatValue(value)}`;
      }

      if (status === 'removed') {
        return `Property '${fullPathString}' was removed`;
      }

      if (status === 'modified') {
        return `Property '${fullPathString}' was updated. From ${formatValue(valueBefore)} to ${formatValue(valueAfter)}`;
      }

      if (status === 'unchanged') {
        return '';
      }

      // status === 'unknown'
      return iter(value, [...path, key]);
    });

    return strings.filter((str) => str !== '')
      .join('\n');
  };

  return iter(diffObj, []);
};

export default formatDiff;
