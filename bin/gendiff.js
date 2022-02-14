#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index.js';

/*
const obj1 = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
};

const obj2 = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
};
*/

program
  .name('gendiff')
  .argument('<filepath1>', 'path to file1')
  .argument('<filepath2>', 'path to file2')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  // .action(() => {
    // console.log(genDiff(obj1, obj2));
    // console.log('Gvenya', 'Spiral');
  // });
  /*
  .action((filepath1, filepath2) => {
    console.log(filepath1, filepath2);
  });
  */
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  });

program.parse();
