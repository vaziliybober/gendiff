/* eslint-disable no-use-before-define */

import _ from 'lodash';

const isObjectNotArray = (value) => _.isObject(value) && !_.isArray(value);

const addAdded = (diff, key, value) => ({
  ...diff,
  [key]: {
    status: 'added',
    value: _.cloneDeep(value),
  },
});

const addRemoved = (diff, key, value) => ({
  ...diff,
  [key]: {
    status: 'removed',
    value: _.cloneDeep(value),
  },
});

const addUnknown = (diff, key, valueBefore, valueAfter) => ({
  ...diff,
  [key]: {
    status: 'unknown',
    value: genDiff(valueBefore, valueAfter),
  },
});

const addUnchanged = (diff, key, value) => ({
  ...diff,
  [key]: {
    status: 'unchanged',
    value: _.cloneDeep(value),
  },
});

const addModified = (diff, key, valueBefore, valueAfter) => ({
  ...diff,
  [key]: {
    status: 'modified',
    valueBefore: _.cloneDeep(valueBefore),
    valueAfter: _.cloneDeep(valueAfter),
  },
});

export const genDiff = (objBefore, objAfter) => {
  const keysBefore = Object.keys(objBefore);
  const keysAfter = Object.keys(objAfter);
  const allKeys = _.union(keysBefore, keysAfter);

  const reducer = (acc, key) => {
    const isKeyBefore = keysBefore.includes(key);
    const isKeyAfter = keysAfter.includes(key);

    const valueBefore = objBefore[key];
    const valueAfter = objAfter[key];

    if (!isKeyBefore && isKeyAfter) {
      return addAdded(acc, key, valueAfter);
    }

    if (isKeyBefore && !isKeyAfter) {
      return addRemoved(acc, key, valueBefore);
    }

    if (isObjectNotArray(valueBefore) && isObjectNotArray(valueAfter)) {
      return addUnknown(acc, key, valueBefore, valueAfter);
    }

    if (_.isEqual(valueBefore, valueAfter)) {
      return addUnchanged(acc, key, valueBefore);
    }

    return addModified(acc, key, valueBefore, valueAfter);
  };

  return allKeys.reduce(reducer, {});
};

export const formatDiff = (diffObj) => {
  const iter = (diff, spacing, specialFormatting) => {
    if (!_.isObject(diff)) {
      return diff;
    }

    const keySpacing = spacing + '  ';
    const newSpacing = spacing + '    ';

    const strings = Object.keys(diff).sort().map((key) => {
      if (!specialFormatting) {
        if (_.isArray(diff)) {
          return `${keySpacing}  ${iter(diff[key], newSpacing, false)}`;
        }
        return `${keySpacing}  ${key}: ${iter(diff[key], newSpacing, false)}`;
      }

      const {
        status, value, valueBefore, valueAfter,
      } = diff[key];

      if (status === 'added') {
        return `${keySpacing}+ ${key}: ${iter(value, newSpacing, false)}`;
      }

      if (status === 'removed') {
        return `${keySpacing}- ${key}: ${iter(value, newSpacing, false)}`;
      }

      if (status === 'modified') {
        return `${keySpacing}- ${key}: ${iter(valueBefore, newSpacing, false)}\n${keySpacing}+ ${key}: ${iter(valueAfter, newSpacing, false)}`;
      }

      if (status === 'unknown') {
        return `${keySpacing}  ${key}: ${iter(value, newSpacing, true)}`;
      }

      // status === 'unchanged'
      return `${keySpacing}  ${key}: ${iter(value, newSpacing, false)}`;
    });

    if (_.isArray(diff)) {
      return `[\n${strings.join('\n')}\n${spacing}]`;
    }
    return `{\n${strings.join('\n')}\n${spacing}}`;
  };

  return iter(diffObj, '', true);
};
