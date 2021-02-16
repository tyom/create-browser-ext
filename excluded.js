#!/usr/bin/env node
const glob = require('glob');
const { basename, resolve } = require('path');

const templatesDir = resolve(__dirname, 'templates/default/');
const files = glob.sync(`${templatesDir}/dist/**/*`);

console.log(files.map((file) => basename(file, '.js')).join(','));
