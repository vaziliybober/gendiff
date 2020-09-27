/* eslint-disable no-underscore-dangle */

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import formatPlain from '../src/formatters/plain.js';
import genDiffStructure from '../src/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', 'plain', filename);

test('json', () => {
  const expected = fs.readFileSync(getFixturePath('result-json')).toString();
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(actual).toBe(expected);
});

test('border case', () => {
  const expected = '';
  const actual = formatPlain(genDiffStructure({}, {}));
  expect(actual).toBe(expected);
});
