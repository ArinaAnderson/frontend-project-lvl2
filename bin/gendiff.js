#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index.js';

program
  .name('gendiff')
  .argument('<filepath1>', 'path to file1')
  .argument('<filepath2>', 'path to file2')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const formatName = program.opts().format;
    console.log(genDiff(filepath1, filepath2, formatName));
  });

program.parse();
