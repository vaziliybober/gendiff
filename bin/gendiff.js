#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/index.js';

const run = (filepath1, filepath2) => {
  console.log(genDiff(filepath1, filepath2, program.format));
};

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information');

program
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>');

program
  .action(run);

program.parse(process.argv);
