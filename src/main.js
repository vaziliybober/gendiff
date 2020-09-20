import _ from 'lodash';

export const genDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2);

  return Object.fromEntries(allKeys.map((key) => {
    const isKey1 = keys1.includes(key);
    const isKey2 = keys2.includes(key);

    const added = !isKey1 && isKey2;
    const removed = isKey1 && !isKey2;

    if (added) {
      return [key, {
        status: 'added',
        value: _.cloneDeep(obj2[key]),
      }];
    }
    if (removed) {
      return [key, {
        status: 'removed',
        value: _.cloneDeep(obj1[key]),
      }];
    }

    const unknown = _.isObject(obj1[key]) && _.isObject(obj2[key]);

    if (unknown) {
      return [key, {
        status: 'unknown',
        value: genDiff(obj1[key], obj2[key]),
      }];
    }

    const unchanged = _.isEqual(obj1[key], obj2[key]);

    if (unchanged) {
      return [key, {
        status: 'unchanged',
        value: _.cloneDeep(obj1[key]),
      }];
    }

    return [key, {
      status: 'modified',
      valueBefore: _.cloneDeep(obj1[key]),
      valueAfter: _.cloneDeep(obj2[key]),
    }];
  }));
};

export const formatDiff = (diffObj) => {
  const iter = (diff, spacing, specialFormatting) => {
    if (!_.isObject(diff)) {
      return diff;
    }

    const keySpacing = `${spacing}  `;

    const strings = Object.keys(diff).sort().map((key) => {
      if (!specialFormatting) {
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

    return `{\n${strings.join('\n')}\n${spacing}}`;
  };

  return iter(diffObj, '', true);
};
