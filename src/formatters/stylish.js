import _ from 'lodash';

const space = '    ';

const stringifyObject = (obj, depth = 0) => {
  if (!_.isObject(obj)) {
    return obj;
  }

  const entryStrings = Object.keys(obj).sort().map((key) => {
    const value = obj[key];
    const keyString = _.isArray(obj) ? '' : `${key}: `;
    return `${keyString}${stringifyObject(value, depth + 1)}`;
  });

  const [openBrace, closeBrace] = _.isArray(obj) ? ['[', ']'] : ['{', '}'];
  const objWithOpenBraceOnly = [openBrace, ...entryStrings].join(`\n${space.repeat(depth + 1)}`);
  const objWithBothBraces = `${objWithOpenBraceOnly}\n${space.repeat(depth)}${closeBrace}`;
  return objWithBothBraces;
};

const formatStylish = (diffStructure) => {
  const iter = (currentDiffStructure, depth) => {
    const diffStrings = currentDiffStructure.flatMap((node) => {
      const {
        name, status, value, valueBefore, valueAfter, children,
      } = node;

      const buildString = (sign, valueString) => `${sign} ${name}: ${valueString}`;

      switch (status) {
        case 'added':
          return buildString('+', stringifyObject(value, depth + 1));
        case 'removed':
          return buildString('-', stringifyObject(value, depth + 1));
        case 'unchanged':
          return buildString(' ', stringifyObject(value, depth + 1));
        case 'modified':
          return [buildString('-', stringifyObject(valueBefore, depth + 1)), buildString('+', stringifyObject(valueAfter, depth + 1))];
        case 'nested':
          return buildString(' ', iter(children, depth + 1));
        default:
          throw new Error(`Incorrect status: ${status}`);
      }
    });

    const diffWithOpenBraceOnly = ['{', ...diffStrings].join(`\n${`  ${space.repeat(depth)}`}`);
    const diffWithBothBraces = `${diffWithOpenBraceOnly}\n${space.repeat(depth)}}`;

    return diffWithBothBraces;
  };

  return iter(diffStructure, 0);
};

export default formatStylish;
