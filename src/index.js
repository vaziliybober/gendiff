import fs from 'fs';
import genDiffJSON from './main.js';

const genDiff = (filepath1, filepath2) => {
  if (!fs.existsSync(filepath1)) {
    console.log(`could not find file ${filepath1}`);
    return;
  }

  if (!fs.existsSync(filepath2)) {
    console.log(`could not find file ${filepath2}`);
    return;
  }

  const jsonstring1 = fs.readFileSync(filepath1);
  const jsonstring2 = fs.readFileSync(filepath2);

  try {
    const json1 = JSON.parse(jsonstring1);
    const json2 = JSON.parse(jsonstring2);
    console.log(genDiffJSON(json1, json2));
  } catch (e) {
    console.log('invalid json');
  }
};

export default genDiff;
