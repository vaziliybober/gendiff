/* eslint-disable no-underscore-dangle */

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);

test.each`
  inputFormat | outputFormat
  ${'json'}   | ${'stylish'}
  ${'yml'}    | ${'stylish'}
  ${'ini'}    | ${'stylish'}
  ${'json'}   | ${'plain'}
  ${'yml'}    | ${'plain'}
  ${'ini'}    | ${'plain'}
  ${'json'}   | ${'json'}
  ${'yml'}    | ${'json'}
  ${'ini'}    | ${'json'}
`(
  'genDiff: input format: $inputFormat, output format: $outputFormat',
  ({ inputFormat, outputFormat }) => {
    const filepath1 = `file1.${inputFormat}`;
    const filepath2 = `file2.${inputFormat}`;
    const resultFilepath = path.join(outputFormat, inputFormat);
    const expected = fs.readFileSync(getFixturePath(resultFilepath)).toString();
    const actual = genDiff(
      getFixturePath(filepath1),
      getFixturePath(filepath2),
      outputFormat,
    );
    expect(actual).toEqual(expected);
  },
);
