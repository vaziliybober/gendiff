import _ from 'lodash';

const formatInDiff = (key, node, spacing, getValueString) => {
  const {
    status, value, valueBefore, valueAfter,
  } = node;

  const buildString = (sign, valueString) => `${spacing}${sign} ${key}: ${valueString}`;
  const newSpacing = `${spacing}  `;

  if (status === 'added') {
    return buildString('+', getValueString(value, newSpacing, false));
  }

  if (status === 'removed') {
    return buildString('-', getValueString(value, newSpacing, false));
  }

  if (status === 'unknown') {
    return buildString(' ', getValueString(value, newSpacing, true));
  }

  if (status === 'unchanged') {
    return buildString(' ', getValueString(value, newSpacing, false));
  }

  // status === 'modified'
  return `${buildString('-', getValueString(valueBefore, newSpacing, false))}\n${
    buildString('+', getValueString(valueAfter, newSpacing, false))}`;
};

const formatInObject = (key, node, spacing, getValueString) => {
  const buildString = (value) => `${spacing}  ${key}: ${value}`;

  return buildString(getValueString(node, `${spacing}  `, false));
};

const formatInArray = (node, spacing, getValueString) => {
  const buildString = (value) => `${spacing}  ${value}`;

  return buildString(getValueString(node, `${spacing}  `, false));
};

const wrapDiffStrings = (strings, spacing, [openPar, closePar]) => `${openPar}\n${strings.join('\n')}\n${spacing}${closePar}`;

const iterDiff = (node, spacing, isDiffNode) => {
  if (!_.isObject(node)) {
    return node;
  }

  const isArray = _.isArray(node);
  const keys = Object.keys(node).sort();
  const newSpacing = `${spacing}  `;

  if (isArray) {
    const strings = keys.map((key) => formatInArray(node[key], newSpacing, iterDiff));
    return wrapDiffStrings(strings, spacing, ['[', ']']);
  }

  if (isDiffNode) {
    const strings = keys.map((key) => formatInDiff(key, node[key], newSpacing, iterDiff));
    return wrapDiffStrings(strings, spacing, ['{', '}']);
  }

  const strings = keys.map((key) => formatInObject(key, node[key], newSpacing, iterDiff));
  return wrapDiffStrings(strings, spacing, ['{', '}']);
};

const formatStylish = (diffStructure) => iterDiff(diffStructure, '', true);

export default formatStylish;
