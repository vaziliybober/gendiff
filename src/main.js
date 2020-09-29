import _ from 'lodash';

const genDiffStructure = (objBefore, objAfter) => {
  const keysBefore = Object.keys(objBefore);
  const keysAfter = Object.keys(objAfter);
  const allKeys = _.union(keysBefore, keysAfter);

  const mapKeyToNode = (key) => {
    const isKeyBefore = _.has(objBefore, key);
    const isKeyAfter = _.has(objAfter, key);

    if (!isKeyBefore) {
      return {
        name: key,
        status: 'added',
        value: objAfter[key],
      };
    }

    if (!isKeyAfter) {
      return {
        name: key,
        status: 'removed',
        value: objBefore[key],
      };
    }

    const valueBefore = objBefore[key];
    const valueAfter = objAfter[key];

    if (_.isPlainObject(valueBefore) && _.isPlainObject(valueAfter)) {
      return {
        name: key,
        status: 'nested',
        children: genDiffStructure(valueBefore, valueAfter),
      };
    }

    if (_.isEqual(valueBefore, valueAfter)) {
      return {
        name: key,
        status: 'unchanged',
        value: valueBefore,
      };
    }

    return {
      name: key,
      status: 'modified',
      valueBefore,
      valueAfter,
    };
  };

  return allKeys.sort().map(mapKeyToNode);
};

export default genDiffStructure;
