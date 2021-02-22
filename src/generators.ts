import path from 'path';
import { Transform } from 'stream';
import { promisify } from 'util';
import { ncp } from 'ncp';
import { ScaffoldData } from './';

const cp = promisify(ncp);

export async function scaffold(projectData: ScaffoldData): Promise<void> {
  return cp(projectData.templatePath, projectData.projectPath, {
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
                  (match: string, p1: keyof ScaffoldData) => projectData[p1] || match
                )
            : chunk;
          done(null, output);
        },
      });
      read.pipe(transformer).pipe(write);
    },
  });
}
