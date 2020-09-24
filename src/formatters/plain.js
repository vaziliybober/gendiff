import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const formatPlain = (diffObj) => {
  const iter = (diff, path) => {
    const strings = Object.keys(diff)
      .filter((key) => diff[key].status !== 'unchanged')
      .sort()
      .map((key) => {
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

        // status === 'unknown'
        return iter(value, [...path, key]);
      });

    return strings.join('\n');
  };

  return iter(diffObj, []);
};

export default formatPlain;
