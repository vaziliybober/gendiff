import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2);

  const resultStrings = allKeys.sort().flatMap((key) => {
    const isKey1 = keys1.includes(key);
    const isKey2 = keys2.includes(key);

    const added = !isKey1 && isKey2;
    const removed = isKey1 && !isKey2;
    const modified = !added && !removed && obj1[key] !== obj2[key];

    const addedString = `+ ${key}: ${obj2[key]}`;
    const removedString = `- ${key}: ${obj1[key]}`;
    const unchangedString = `  ${key}: ${obj1[key]}`;

    if (added) {
      return [addedString];
    }
    if (removed) {
      return [removedString];
    }
    if (modified) {
      return [removedString, addedString];
    }
    return [unchangedString];
  });

  if (resultStrings.length === 0) {
    return '{\n}';
  }

  return `{\n  ${resultStrings.join('\n  ')}\n}`;
};

export default genDiff;
