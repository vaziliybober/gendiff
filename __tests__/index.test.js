import { resolve as resolvePath } from 'path';
import genDiff from '../src/index.js';

test('genDiff', () => {
  const result = '{\n'
    + '  - follow: false\n'
    + '    host: hexlet.io\n'
    + '  - proxy: 123.234.53.22\n'
    + '  - timeout: 50\n'
    + '  + timeout: 20\n'
    + '  + verbose: true\n'
    + '}';

  expect(genDiff('__fixtures__/json-flat-1', resolvePath(process.cwd(), '__fixtures__/json-flat-2'))).toBe(result);
});
