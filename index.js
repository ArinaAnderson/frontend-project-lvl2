import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import genDiffString from './src/genDiffString.js';

const genDiff = (data1, data2) => genDiffString(data1, data2);
// JSON.parse of data from files

export default genDiff;
