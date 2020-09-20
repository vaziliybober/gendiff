import { resolve as resolvePath } from 'path';
import genDiff from '../src/index.js';

import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';

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

  expect(genDiff(getFixturePath('json-flat-1.json'), getFixturePath('json-flat-2.json'))).toBe(result);
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
