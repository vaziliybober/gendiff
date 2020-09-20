/* eslint-disable no-underscore-dangle */

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('nested json', () => {
  const expected = fs.readFileSync(getFixturePath('result-nested')).toString();
  const actual = genDiff(getFixturePath('json-nested-1.json'), getFixturePath('json-nested-2.json'));
  expect(actual).toBe(expected);
});

test('nested yaml', () => {
  const expected = fs.readFileSync(getFixturePath('result-nested')).toString();
  const actual = genDiff(getFixturePath('yaml-nested-1.yml'), getFixturePath('yaml-nested-2.yml'));
  expect(actual).toBe(expected);
});

test('nested ini', () => {
  const expected = fs.readFileSync(getFixturePath('result-nested')).toString();
  const actual = genDiff(getFixturePath('ini-nested-1.ini'), getFixturePath('ini-nested-2.ini'));
  expect(actual).toBe(expected);
});
