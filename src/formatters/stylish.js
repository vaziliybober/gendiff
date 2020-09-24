import _ from 'lodash';

const formatInDiff = (key, node, spacing) => {
  const {
    status, value, valueBefore, valueAfter,
  } = node;

  const buildString = (sign, value) => `${spacing}${sign} ${key}: ${value}`;
  const newSpacing = spacing + '  ';

  if (status === 'added') {
    return buildString('+', iterDiff(value, newSpacing, false));
  }

  if (status === 'removed') {
    return buildString('-', iterDiff(value, newSpacing, false));
  }

  if (status === 'unknown') {
    return buildString(' ', iterDiff(value, newSpacing, true));
  }

  if (status === 'unchanged') {
    return buildString(' ', iterDiff(value, newSpacing, false));
  }

  // status === 'modified'
  return `${buildString('-', iterDiff(valueBefore, newSpacing, false))}\n${
    buildString('+', iterDiff(valueAfter, newSpacing, false))}`;
}

const formatInObject = (key, node, spacing) => {
  const buildString = (value) => `${spacing}  ${key}: ${value}`;

  return buildString(iterDiff(node, spacing + '  ', false));
}

const formatInArray = (node, spacing) => {
  const buildString = (value) => `${spacing}  ${value}`;

  return buildString(iterDiff(node, spacing + '  ', false));
}

const buildString = (strings, spacing, [openPar, closePar]) => {
  return `${openPar}\n${strings.join('\n')}\n${spacing}${closePar}`;
}

const iterDiff = (node, spacing, isDiffNode) => {
  if (!_.isObject(node)) {
    return node;
  }

  const isArray = _.isArray(node);
  const keys = Object.keys(node).sort();

  if (isArray) {
    const strings = keys.map(key => formatInArray(node[key], spacing + '  '));
    return buildString(strings, spacing, ['[', ']']);
  }
  
  if (isDiffNode) {
    const strings = keys.map(key => formatInDiff(key, node[key], spacing + '  '));
    return buildString(strings, spacing, ['{', '}']);
  }

  const strings = keys.map(key => formatInObject(key, node[key], spacing + '  '));
  return buildString(strings, spacing, ['{', '}']);
};

const formatDiff = (diffStructure) => {
  return iterDiff(diffStructure, '', true);
};

export default formatDiff;
