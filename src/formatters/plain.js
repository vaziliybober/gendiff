import _ from 'lodash';
import buildFormatter from './buildFormatter.js';

const stringifyValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const stringifyNode = (
  {
    status, stringValue, stringValueBefore, stringValueAfter,
  },
  { path },
) => {
  const fullPathString = path.join('.');

  switch (status) {
    case 'added':
      return `Property '${fullPathString}' was added with value: ${stringValue}`;
    case 'removed':
      return `Property '${fullPathString}' was removed`;
    case 'unchanged':
      return 'unchanged';
    case 'modified':
      return `Property '${fullPathString}' was updated. From ${stringValueBefore} to ${stringValueAfter}`;
    case 'nested':
      return stringValue;
    default:
      throw new Error(`Incorrect status: ${status}`);
  }
};

const composeStringNodes = (stringNodes) => stringNodes.filter((stringNode) => stringNode !== 'unchanged').join('\n');

export default buildFormatter(
  stringifyValue,
  stringifyNode,
  composeStringNodes,
);
