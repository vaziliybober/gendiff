import _ from 'lodash';

const buildLeafAdded = (key, value) => ({
  name: key,
  status: 'added',
  value,
});

const buildLeafRemoved = (key, value) => ({
  name: key,
  status: 'removed',
  value,
});

const buildNode = (key, children) => ({
  name: key,
  status: 'nested',
  children,
});

const buildLeafUnchanged = (key, value) => ({
  name: key,
  status: 'unchanged',
  value,
});

const buildLeafModified = (key, valueBefore, valueAfter) => ({
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

    if (!isKeyBefore) {
      return buildLeafAdded(key, objAfter[key]);
    }

    if (!isKeyAfter) {
      return buildLeafRemoved(key, objBefore[key]);
    }

    const valueBefore = objBefore[key];
    const valueAfter = objAfter[key];

    if (_.isPlainObject(valueBefore) && _.isPlainObject(valueAfter)) {
      return buildNode(key, genDiffStructure(valueBefore, valueAfter));
    }

    if (_.isEqual(valueBefore, valueAfter)) {
      return buildLeafUnchanged(key, valueBefore);
    }

    return buildLeafModified(key, valueBefore, valueAfter);
  };

  return allKeys.sort().map(mapKeyToNode);
};

// const genDiffStructure = (objBefore, objAfter) => {
//   const keysBefore = Object.keys(objBefore);
//   const keysAfter = Object.keys(objAfter);
//   const allKeys = _.union(keysBefore, keysAfter);

//   const mapKeyToNode = (key) => {
//     const isKeyBefore = _.has(objBefore, key);
//     const isKeyAfter = _.has(objAfter, key);

//     const valueBefore = objBefore[key];
//     const valueAfter = objAfter[key];

//     if (!isKeyBefore) {
//       return {
//         type: 'leaf',
//         name: key,
//         status: 'added',
//         value: valueAfter,
//       }
//     }

//     if (!isKeyAfter) {
//       return {
//         type: 'leaf',
//         name: key,
//         status: 'removed',
//         value: valueBefore,
//       }
//     }

//     if (_.isPlainObject(valueBefore) && _.isPlainObject(valueAfter)) {
//       return {
//         type: 'node',
//         name: key,
//         children: genDiffStructure(valueBefore, valueAfter),
//       };
//     }

//     if (_.isEqual(valueBefore, valueAfter)) {
//       return {
//         type: 'leaf',
//         name: key,
//         status: 'unchanged',
//         value: valueBefore,
//       }
//     }

//     return {
//       type: 'leaf',
//       name: key,
//       status: 'modified',
//       valueBefore,
//       valueAfter,
//     };
//   };

//   return allKeys.sort().map(mapKeyToNode);
// };

export default genDiffStructure;
