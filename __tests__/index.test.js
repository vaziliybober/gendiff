/* eslint-disable no-underscore-dangle */

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each`
  filename1         | filename2       | resultFilename
  ${'file1.json'}   | ${'file2.json'} | ${'result-json-stylish'}
  ${'file1.yml'}    | ${'file2.yml'}  | ${'result-yaml-stylish'}
  ${'file1.ini'}    | ${'file2.ini'}  | ${'result-ini-stylish'}
`("genDiff($filename1, $filename2, 'stylish')", ({ filename1, filename2, resultFilename }) => {
  const expected = fs.readFileSync(getFixturePath(resultFilename)).toString();
  const actual = genDiff(getFixturePath(filename1), getFixturePath(filename2), 'stylish');
  expect(actual).toEqual(expected);
});

test.each`
  filename1         | filename2       | resultFilename
  ${'file1.json'}   | ${'file2.json'} | ${'result-json-plain'}
  ${'file1.yml'}    | ${'file2.yml'}  | ${'result-yaml-plain'}
  ${'file1.ini'}    | ${'file2.ini'}  | ${'result-ini-plain'}
`("genDiff($filename1, $filename2, 'plain')", ({ filename1, filename2, resultFilename }) => {
  const expected = fs.readFileSync(getFixturePath(resultFilename)).toString();
  const actual = genDiff(getFixturePath(filename1), getFixturePath(filename2), 'plain');
  expect(actual).toEqual(expected);
});

test.each`
  filename1         | filename2       | resultFilename
  ${'file1.json'}   | ${'file2.json'} | ${'result-json-json'}
  ${'file1.yml'}    | ${'file2.yml'}  | ${'result-yaml-json'}
  ${'file1.ini'}    | ${'file2.ini'}  | ${'result-ini-json'}
`("genDiff($filename1, $filename2, 'json')", ({ filename1, filename2, resultFilename }) => {
  const expected = fs.readFileSync(getFixturePath(resultFilename)).toString();
  const actual = genDiff(getFixturePath(filename1), getFixturePath(filename2), 'json');
  expect(JSON.parse(actual)).toEqual(JSON.parse(expected));
});
