import { resolve as resolvePath } from 'path';
import genDiff from '../src/index.js';

test('flat json', () => {
  const result = '{\n'
    + '  - follow: false\n'
    + '    host: hexlet.io\n'
    + '  - proxy: 123.234.53.22\n'
    + '  - timeout: 50\n'
    + '  + timeout: 20\n'
    + '  + verbose: true\n'
    + '}';

  expect(genDiff('__fixtures__/json-flat-1.json', resolvePath(process.cwd(), '__fixtures__/json-flat-2.json'))).toBe(result);
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

  expect(genDiff('__fixtures__/yaml-flat-1.yml', resolvePath(process.cwd(), '__fixtures__/yaml-flat-2.yml'))).toBe(result);
});
