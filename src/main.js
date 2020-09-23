import _ from 'lodash';

const isObjectNotArray = (value) => _.isObject(value) && !_.isArray(value);

const addNodeAdded = (diff, key, value) => ({
  ...diff,
  [key]: {
    status: 'added',
    value: _.cloneDeep(value),
  },
});

const addNodeRemoved = (diff, key, value) => ({
  ...diff,
  [key]: {
    status: 'removed',
    value: _.cloneDeep(value),
  },
});

const addNodeUnknown = (diff, key, value) => ({
  ...diff,
  [key]: {
    status: 'unknown',
    value,
  },
});

const addNodeUnchanged = (diff, key, value) => ({
  ...diff,
  [key]: {
    status: 'unchanged',
    value: _.cloneDeep(value),
  },
});

const addNodeModified = (diff, key, valueBefore, valueAfter) => ({
  ...diff,
  [key]: {
    status: 'modified',
    valueBefore: _.cloneDeep(valueBefore),
    valueAfter: _.cloneDeep(valueAfter),
  },
});

const genDiffStructure = (objBefore, objAfter) => {
  const keysBefore = Object.keys(objBefore);
  const keysAfter = Object.keys(objAfter);
  const allKeys = _.union(keysBefore, keysAfter);

  const reducer = (acc, key) => {
    const isKeyBefore = keysBefore.includes(key);
    const isKeyAfter = keysAfter.includes(key);

    const valueBefore = objBefore[key];
    const valueAfter = objAfter[key];

    if (!isKeyBefore && isKeyAfter) {
      return addNodeAdded(acc, key, valueAfter);
    }

    if (isKeyBefore && !isKeyAfter) {
      return addNodeRemoved(acc, key, valueBefore);
    }

    if (isObjectNotArray(valueBefore) && isObjectNotArray(valueAfter)) {
      return addNodeUnknown(acc, key, genDiffStructure(valueBefore, valueAfter));
    }

    if (_.isEqual(valueBefore, valueAfter)) {
      return addNodeUnchanged(acc, key, valueBefore);
    }

    return addNodeModified(acc, key, valueBefore, valueAfter);
  };

  return allKeys.reduce(reducer, {});
};

export default genDiffStructure;
