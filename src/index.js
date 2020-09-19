import { readFileSync, existsSync } from 'fs';
import path from 'path';
import genDiffObj from './main.js';
import getParser from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  if (!existsSync(filepath1)) {
    return `could not find file ${filepath1}`;
  }

  if (!existsSync(filepath2)) {
    return `could not find file ${filepath2}`;
  }

  let content1; let
    content2;
  try {
    content1 = readFileSync(filepath1);
    content2 = readFileSync(filepath2);
  } catch (e) {
    return e;
  }

  const ext1 = path.extname(filepath1);
  const ext2 = path.extname(filepath2);
  const parse1 = getParser(ext1);
  const parse2 = getParser(ext2);

  if (parse1 === null) {
    return `${ext1} files are not supported`;
  }

  if (parse2 === null) {
    return `${ext2} files are not supported`;
  }

  let struct1; let
    struct2;
  try {
    struct1 = parse1(content1);
    struct2 = parse2(content2);
  } catch (e) {
    return e;
  }

  return genDiffObj(struct1, struct2);
};

export default genDiff;
