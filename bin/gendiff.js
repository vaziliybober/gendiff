#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information');

program
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>');

program
  .action(genDiff);

program.parse(process.argv);
