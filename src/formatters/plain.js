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
      .filter((node) => !(node.type === 'leaf' && node.status === 'unchanged'))
      .map((node) => {
        const {
          type, name, status, value, valueBefore, valueAfter, children,
        } = node;

        const newPath = [...path, name];
        const fullPathString = newPath.join('.');

        if (type === 'node') {
          return iter(children, newPath);
        }

        if (type === 'leaf') {
          switch (status) {
            case 'added':
              return `Property '${fullPathString}' was added with value: ${formatValue(value)}`;
            case 'removed':
              return `Property '${fullPathString}' was removed`;
            case 'modified':
              return `Property '${fullPathString}' was updated. From ${formatValue(valueBefore)} to ${formatValue(valueAfter)}`;
            default:
              throw new Error(`Incorrect node status: ${status}`);
          }
        }

        throw new Error(`Incorrect node type: ${type}`);
      });

    return strings.join('\n');
  };

  return iter(diffStructure, []);
};

export default formatPlain;
