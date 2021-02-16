const { writeFileSync } = require('fs');
const { basename, relative, resolve } = require('path');
const mkdirp = require('mkdirp');
const glob = require('glob');
const ncc = require('@vercel/ncc');

const DIST_DIR = resolve(__dirname, '../dist');
const CACHE_DIR = resolve(DIST_DIR, '.cache');

const options = {
  cache: CACHE_DIR,
  externals: [],
  minify: true,
  sourceMap: true,
  watch: false,
};

function write(file, data) {
  writeFileSync(file, data);

  console.log(`✓ ${relative(__dirname + '/../', file)} (${bytes(statSync(file).size)})`);
}

async function build(file) {
  const { code, map, assets } = await ncc(file, options);

  console.log(code);

  if (Object.keys(assets).length)
    console.error('New unexpected assets are being emitted for', file);

  // const name = basename(file, '.js');
  // await mkdirp(resolve(DIST_DIR, name));
  // write(resolve(DIST_DIR, name, 'index.js'), code);
  // write(resolve(DIST_DIR, name, 'index.map.js'), map);
}

function start() {
  mkdirp.sync(CACHE_DIR);
  const files = glob.sync(resolve(__dirname, '../src/index.ts'));

  return Promise.all(files.map(build));
}

start();
