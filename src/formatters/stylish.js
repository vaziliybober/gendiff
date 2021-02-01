import _ from 'lodash';
import buildFormatter from './buildFormatter.js';

const space = '    ';

const stringifyObject = (obj, depth = 0) => {
  if (!_.isObject(obj)) {
    return obj;
  }

  const entryStrings = Object.keys(obj)
    .sort()
    .map((key) => {
      const value = obj[key];
      const keyString = _.isArray(obj) ? '' : `${key}: `;
      return `${keyString}${stringifyObject(value, depth + 1)}`;
    });

  const [openBrace, closeBrace] = _.isArray(obj) ? ['[', ']'] : ['{', '}'];
  const objWithOpenBraceOnly = [openBrace, ...entryStrings].join(
    `\n${space.repeat(depth + 1)}`,
  );
  const objWithBothBraces = `${objWithOpenBraceOnly}\n${space.repeat(
    depth,
  )}${closeBrace}`;
  return objWithBothBraces;
};

const stringifyValue = stringifyObject;

const stringifyNode = ({
  name,
  status,
  stringValue,
  stringValueBefore,
  stringValueAfter,
}) => {
  const build = (sign, chosenStringValue) => `${sign} ${name}: ${chosenStringValue}`;

  switch (status) {
    case 'added':
      return build('+', stringValue);
    case 'removed':
      return build('-', stringValue);
    case 'unchanged':
      return build(' ', stringValue);
    case 'modified':
      return [build('-', stringValueBefore), build('+', stringValueAfter)];
    case 'nested':
      return build(' ', stringValue);
    default:
      throw new Error(`Incorrect status: ${status}`);
  }
};

const composeStringNodes = (stringNodes, { depth }) => {
  const diffWithOpenBraceOnly = ['{', ...stringNodes].join(
    `\n${`  ${space.repeat(depth)}`}`,
  );
  const diffWithBothBraces = `${diffWithOpenBraceOnly}\n${space.repeat(
    depth,
  )}}`;

  return diffWithBothBraces;
};

export default buildFormatter(
  stringifyValue,
  stringifyNode,
  composeStringNodes,
);
