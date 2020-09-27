/* eslint-disable no-underscore-dangle */

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import formatStylish from '../src/formatters/stylish.js';
import genDiffStructure from '../src/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', 'stylish', filename);

test('json', () => {
  const expected = fs.readFileSync(getFixturePath('result-json')).toString();
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actual).toBe(expected);
});

test('yaml', () => {
  const expected = fs.readFileSync(getFixturePath('result-yaml')).toString();
  const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(actual).toBe(expected);
});

test('ini', () => {
  const expected = fs.readFileSync(getFixturePath('result-ini')).toString();
  const actual = genDiff(getFixturePath('file1.ini'), getFixturePath('file2.ini'));
  expect(actual).toBe(expected);
});

test('border case', () => {
  const expected = '{\n}';
  const actual = formatStylish(genDiffStructure({}, {}));
  expect(actual).toBe(expected);
});
