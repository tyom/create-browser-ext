import path from 'path';
import { Transform } from 'stream';
import { promisify } from 'util';
import { ncp } from 'ncp';
import { Fields } from './types';

const cp = promisify(ncp);

export async function scaffold(source: string, destination: string, fields: Fields) {
  return cp(source, destination, {
    clobber: true,
    filter(name) {
      return !/(node_modules\/|dist\/)/.test(name);
    },
    transform(read, write, file) {
      const transformableFile = ['.js', '.json'].includes(path.extname(file.name));
      const transformer = new Transform({
        transform(chunk, _, done) {
          const output = transformableFile
            ? chunk
                .toString()
                .replace(
                  /{{([a-zA-Z0-9_]+)}}/g,
                  (match: string, p1: string) => fields[p1] || match
                )
            : chunk;
          done(null, output);
        },
      });
      read.pipe(transformer).pipe(write);
    },
  });
}
