/* eslint-disable no-underscore-dangle */

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);

test.each`
  filepath1         | filepath2       | resultFilepath
  ${'file1.json'}   | ${'file2.json'} | ${'stylish/json'}
  ${'file1.yml'}    | ${'file2.yml'}  | ${'stylish/yaml'}
  ${'file1.ini'}    | ${'file2.ini'}  | ${'stylish/ini'}
`("genDiff($filepath1, $filepath2, 'stylish')", ({ filepath1, filepath2, resultFilepath }) => {
  const expected = fs.readFileSync(getFixturePath(resultFilepath)).toString();
  const actual = genDiff(getFixturePath(filepath1), getFixturePath(filepath2));
  expect(actual).toEqual(expected);
});

test.each`
  filepath1         | filepath2       | resultFilepath
  ${'file1.json'}   | ${'file2.json'} | ${'plain/json'}
  ${'file1.yml'}    | ${'file2.yml'}  | ${'plain/yaml'}
  ${'file1.ini'}    | ${'file2.ini'}  | ${'plain/ini'}
`("genDiff($filepath1, $filepath2, 'plain')", ({ filepath1, filepath2, resultFilepath }) => {
  const expected = fs.readFileSync(getFixturePath(resultFilepath)).toString();
  const actual = genDiff(getFixturePath(filepath1), getFixturePath(filepath2), 'plain');
  expect(actual).toEqual(expected);
});

test.each`
  filepath1         | filepath2       | resultFilepath
  ${'file1.json'}   | ${'file2.json'} | ${'json/json'}
  ${'file1.yml'}    | ${'file2.yml'}  | ${'json/yaml'}
  ${'file1.ini'}    | ${'file2.ini'}  | ${'json/ini'}
`("genDiff($filepath1, $filepath2, 'json')", ({ filepath1, filepath2, resultFilepath }) => {
  const expected = fs.readFileSync(getFixturePath(resultFilepath)).toString();
  const actual = genDiff(getFixturePath(filepath1), getFixturePath(filepath2), 'json');
  expect(JSON.parse(actual)).toEqual(JSON.parse(expected));
});
