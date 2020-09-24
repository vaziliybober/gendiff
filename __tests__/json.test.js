/* eslint-disable no-underscore-dangle */

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import formatJson from '../src/formatters/json.js';
import genDiffStructure from '../src/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', 'json', filename);

test('json', () => {
  const expected = fs.readFileSync(getFixturePath('result.json')).toString();
  const actual = genDiff(getFixturePath('json-1.json'), getFixturePath('json-2.json'), 'json');
  expect(JSON.parse(actual)).toEqual(JSON.parse(expected));
});

test('border case', () => {
  const expected = '{}';
  const actual = formatJson(genDiffStructure({}, {}));
  expect(actual).toBe(expected);
});
