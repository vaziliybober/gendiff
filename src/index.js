import { readFileSync, existsSync } from 'fs';
import genDiffJSON from './main.js';

const genDiff = (filepath1, filepath2) => {
  if (!existsSync(filepath1)) {
    return `could not find file ${filepath1}`;
  }

  if (!existsSync(filepath2)) {
    return `could not find file ${filepath2}`;
  }

  const jsonstring1 = readFileSync(filepath1);
  const jsonstring2 = readFileSync(filepath2);

  try {
    const json1 = JSON.parse(jsonstring1);
    const json2 = JSON.parse(jsonstring2);
    return genDiffJSON(json1, json2);
  } catch (e) {
    return 'invalid json';
  }
};

export default genDiff;
