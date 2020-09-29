import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const formatPlain = (diffStructure) => {
  const iter = (currentDiffStructure, path) => {
    const strings = currentDiffStructure
      .filter((node) => node.status !== 'unchanged')
      .map((node) => {
        const {
          name, status, value, valueBefore, valueAfter, children,
        } = node;

        const newPath = [...path, name];
        const fullPathString = newPath.join('.');

        switch (status) {
          case 'added':
            return `Property '${fullPathString}' was added with value: ${formatValue(value)}`;
          case 'removed':
            return `Property '${fullPathString}' was removed`;
          case 'modified':
            return `Property '${fullPathString}' was updated. From ${formatValue(valueBefore)} to ${formatValue(valueAfter)}`;
          case 'nested':
            return iter(children, newPath);
          default:
            throw new Error(`Incorrect status: ${status}`);
        }
      });

    return strings.join('\n');
  };

  return iter(diffStructure, []);
};

export default formatPlain;
