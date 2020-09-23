import fs from 'fs';
import path from 'path';
import genDiffStructure from './main.js';
import getFormatter from './formatters/index.js';
import getParser from './parsers.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath).toString();
  return data;
};

const parseFile = (filepath) => {
  const rawData = readFile(filepath);
  const extension = path.extname(filepath);
  const parse = getParser(extension);

  return parse(rawData);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const formatDiff = getFormatter(format);
  const diffStructure = genDiffStructure(obj1, obj2);
  return formatDiff(diffStructure);
};

export default genDiff;
