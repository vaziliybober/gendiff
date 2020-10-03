/* eslint-disable no-underscore-dangle */

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiffStructure from '../src/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);

test('genDiffStructure test', () => {
  const objBefore = JSON.parse(fs.readFileSync(getFixturePath('main/obj-before.json')));
  const objAfter = JSON.parse(fs.readFileSync(getFixturePath('main/obj-after.json')));
  const expected = JSON.parse(fs.readFileSync(getFixturePath('main/result.json')));
  const actual = genDiffStructure(objBefore, objAfter);
  expect(actual).toEqual(expected);
});
