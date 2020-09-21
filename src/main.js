import _ from 'lodash';

const isObjectNotArray = (value) => _.isObject(value) && !_.isArray(value);

export const genDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2);

  const reducer = (acc, key) => {
    const isKey1 = keys1.includes(key);
    const isKey2 = keys2.includes(key);

    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!isKey1 && isKey2) {
      return {...acc, [key]: {
        status: 'added',
        value: _.cloneDeep(value2)
      }};
    }

    if (isKey1 && !isKey2) {
      return {...acc, [key]: {
        status: 'removed',
        value: _.cloneDeep(value1)
      }};
    }

    if (isObjectNotArray(value1) && isObjectNotArray(value2)) {
      return {...acc, [key]: {
        status: 'unknown',
        value: genDiff(obj1[key], obj2[key])
      }};
    }

    if (_.isEqual(value1, value2)) {
      return {...acc, [key]: {
        status: 'unchanged',
        value: _.cloneDeep(value1)
      }};
    }

    return {...acc, [key]: {
      status: 'modified',
      valueBefore: _.cloneDeep(value1),
      valueAfter: _.cloneDeep(value2),
    }};
  }

  return allKeys.reduce(reducer, {});
};

export const formatDiff = (diffObj) => {
  const iter = (diff, spacing, specialFormatting) => {
    if (!_.isObject(diff)) {
      return diff;
    }

    const keySpacing = `${spacing}  `;

    const strings = Object.keys(diff).sort().map((key) => {
      if (!specialFormatting) {
        if (_.isArray(diff)) {
          return `${keySpacing}  ${iter(diff[key], `${spacing}    `, false)}`;
        }
        return `${keySpacing}  ${key}: ${iter(diff[key], `${spacing}    `, false)}`;
      }

      const {
        status, value, valueBefore, valueAfter,
      } = diff[key];

      if (status === 'added') {
        return `${keySpacing}+ ${key}: ${iter(value, `${spacing}    `, false)}`;
      }

      if (status === 'removed') {
        return `${keySpacing}- ${key}: ${iter(value, `${spacing}    `, false)}`;
      }

      if (status === 'modified') {
        return `${keySpacing}- ${key}: ${iter(valueBefore, `${spacing}    `, false)}\n${keySpacing}+ ${key}: ${iter(valueAfter, `${spacing}    `, false)}`;
      }

      if (status === 'unknown') {
        return `${keySpacing}  ${key}: ${iter(value, `${spacing}    `, true)}`;
      }

      // status === 'unchanged'
      return `${keySpacing}  ${key}: ${iter(value, `${spacing}    `, false)}`;
    });

    if (_.isArray(diff)) {
      return `[\n${strings.join('\n')}\n${spacing}]`;
    }
    return `{\n${strings.join('\n')}\n${spacing}}`;
  };

  return iter(diffObj, '', true);
};
