import _ from 'lodash';

const formatDiff = (diffObj) => {
  const iter = (diff, spacing, specialFormatting = false) => {
    if (!_.isObject(diff)) {
      return diff;
    }

    const keySpacing = `${spacing}  `;
    const newSpacing = `${spacing}    `;

    const strings = Object.keys(diff).sort().map((key) => {
      const buildString = (sign, value, isArray = false) => {
        const keyString = isArray ? '' : `${key}: `;
        return `${keySpacing}${sign} ${keyString}${value}`;
      };

      if (!specialFormatting) {
        return buildString(' ', iter(diff[key], newSpacing), _.isArray(diff));
      }

      const {
        status, value, valueBefore, valueAfter,
      } = diff[key];

      if (status === 'added') {
        return buildString('+', iter(value, newSpacing));
      }

      if (status === 'removed') {
        return buildString('-', iter(value, newSpacing));
      }

      if (status === 'unknown') {
        return buildString(' ', iter(value, newSpacing, true));
      }

      if (status === 'unchanged') {
        return buildString(' ', iter(value, newSpacing));
      }

      // status === 'modified'
      return `${buildString('-', iter(valueBefore, newSpacing))}\n${
        buildString('+', iter(valueAfter, newSpacing))}`;
    });

    const [openPar, closePar] = _.isArray(diff) ? ['[', ']'] : ['{', '}'];

    return `${openPar}\n${strings.join('\n')}\n${spacing}${closePar}`;
  };

  return iter(diffObj, '', true);
};

export default formatDiff;
