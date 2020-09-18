import genDiff from '../src/main.js';

test('genDiff JSON to string', () => {
  const json1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };

  const json2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };

  const result = '{\n'
    + '  - follow: false\n'
    + '    host: hexlet.io\n'
    + '  - proxy: 123.234.53.22\n'
    + '  - timeout: 50\n'
    + '  + timeout: 20\n'
    + '  + verbose: true\n'
    + '}';

  expect(genDiff(json1, json2)).toBe(result);
  expect(genDiff({}, {})).toBe('{\n}');
});
