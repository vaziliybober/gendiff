/* eslint-disable no-underscore-dangle */

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('flat json', () => {
  const result = '{\n'
    + '  - follow: false\n'
    + '    host: hexlet.io\n'
    + '  - proxy: 123.234.53.22\n'
    + '  - timeout: 50\n'
    + '  + timeout: 20\n'
    + '  + verbose: true\n'
    + '}';

  const actual = genDiff(getFixturePath('json-flat-1.json'), getFixturePath('json-flat-2.json'));
  expect(actual).toBe(result);
});

test('flat yaml', () => {
  const result = '{\n'
    + '  - follow: false\n'
    + '    host: hexlet.io\n'
    + '  - proxy: 123.234.53.22\n'
    + '  - timeout: 50\n'
    + '  + timeout: 20\n'
    + '  + verbose: true\n'
    + '}';

  expect(genDiff(getFixturePath('yaml-flat-1.yml'), getFixturePath('yaml-flat-2.yml'))).toBe(result);
});

test('flat ini', () => {
  const result = '{\n'
    + '  - follow: false\n'
    + '    host: hexlet.io\n'
    + '  - proxy: 123.234.53.22\n'
    + '  - timeout: 50\n'
    + '  + timeout: 20\n'
    + '  + verbose: true\n'
    + '}';

  expect(genDiff(getFixturePath('ini-flat-1.ini'), getFixturePath('ini-flat-2.ini'))).toBe(result);
});

test('nested json', () => {
  const result = fs.readFileSync(getFixturePath('result-nested')).toString();
  const actual = genDiff(getFixturePath('json-nested-1.json'), getFixturePath('json-nested-2.json'));
  expect(actual).toBe(result);
});

test('nested yaml', () => {
  const result = fs.readFileSync(getFixturePath('result-nested')).toString();
  expect(genDiff(getFixturePath('yaml-nested-1.yml'), getFixturePath('yaml-nested-2.yml'))).toBe(result);
});

test('nested ini', () => {
  const result = fs.readFileSync(getFixturePath('result-nested')).toString();
  const actual = genDiff(getFixturePath('ini-nested-1.ini'), getFixturePath('ini-nested-2.ini'));
  expect(actual).toBe(result);
});
