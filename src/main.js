import _ from 'lodash';

const isObjectNotArray = (value) => _.isObject(value) && !_.isArray(value);

const buildLeafAdded = (key, value) => ({
  type: 'leaf',
  name: key,
  status: 'added',
  value,
});

const buildLeafRemoved = (key, value) => ({
  type: 'leaf',
  name: key,
  status: 'removed',
  value,
});

const buildNode = (key, children) => ({
  type: 'node',
  name: key,
  children,
});

const buildLeafUnchanged = (key, value) => ({
  type: 'leaf',
  name: key,
  status: 'unchanged',
  value,
});

const buildLeafModified = (key, valueBefore, valueAfter) => ({
  type: 'leaf',
  name: key,
  status: 'modified',
  valueBefore,
  valueAfter,
});

const genDiffStructure = (objBefore, objAfter) => {
  const keysBefore = Object.keys(objBefore);
  const keysAfter = Object.keys(objAfter);
  const allKeys = _.union(keysBefore, keysAfter);

  const mapKeyToNode = (key) => {
    const isKeyBefore = _.has(objBefore, key);
    const isKeyAfter = _.has(objAfter, key);

    const valueBefore = objBefore[key];
    const valueAfter = objAfter[key];

    if (!isKeyBefore) {
      return buildLeafAdded(key, valueAfter);
    }

    if (!isKeyAfter) {
      return buildLeafRemoved(key, valueBefore);
    }

    if (isObjectNotArray(valueBefore) && isObjectNotArray(valueAfter)) {
      return buildNode(key, genDiffStructure(valueBefore, valueAfter));
    }

    if (_.isEqual(valueBefore, valueAfter)) {
      return buildLeafUnchanged(key, valueBefore);
    }

    return buildLeafModified(key, valueBefore, valueAfter);
  };

  return allKeys.sort().map(mapKeyToNode);
};

export default genDiffStructure;
