import _ from 'lodash';

const space = '    ';

const stringifyObject = (obj, depth = 0) => {
  if (!_.isObject(obj)) {
    return String(obj);
  }

  const entryStrings = Object.keys(obj).sort().map((key) => {
    const value = obj[key];
    const keyString = _.isArray(obj) ? '' : `${key}: `;
    return `${keyString}${stringifyObject(value, depth + 1)}`;
  });

  const [openPar, closePar] = _.isArray(obj) ? ['[', ']'] : ['{', '}'];
  const wrappedEntryStrings = `${[openPar, ...entryStrings].join(`\n${space.repeat(depth + 1)}`)}\n${space.repeat(depth)}${closePar}`;
  return wrappedEntryStrings;
};

const formatStylish = (diffStructure) => {
  const iter = (currentDiffStructure, depth) => {
    const diffStrings = currentDiffStructure.flatMap((node) => {
      const {
        type, name, status, value, valueBefore, valueAfter, children,
      } = node;

      const buildString = (sign, valueString) => `${sign} ${name}: ${valueString}`;

      if (type === 'node') {
        return buildString(' ', iter(children, depth + 1));
      }

      if (type === 'leaf') {
        switch (status) {
          case 'added':
            return buildString('+', stringifyObject(value, depth + 1));
          case 'removed':
            return buildString('-', stringifyObject(value, depth + 1));
          case 'unchanged':
            return buildString(' ', stringifyObject(value, depth + 1));
          case 'modified':
            return [buildString('-', stringifyObject(valueBefore, depth + 1)), buildString('+', stringifyObject(valueAfter, depth + 1))];
          default:
            throw new Error(`Incorrect node status: ${status}`);
        }
      }

      throw new Error(`Incorrect node type: ${type}`);
    });

    const wrappedDiffStrings = `${['{', ...diffStrings].join(`\n${`  ${space.repeat(depth)}`}`)}\n${space.repeat(depth)}}`;
    return wrappedDiffStrings;
  };

  return iter(diffStructure, 0);
};

export default formatStylish;
