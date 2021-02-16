#!/usr/bin/env node
import path from 'path';
import sade from 'sade';
import { promises as fs } from 'fs';
import kleur from 'kleur';
import install from 'pkg-install';
import { version } from '../package.json';
import { getProjectDir, getUserFields } from './inputs';
import { scaffold } from './generators';

export const TEMPLATES_DIR = 'templates';

const defaultFields = {
  title: 'New Chrome Extension',
  description: 'A Chrome extension built with a starter kit',
  template: 'default',
};

async function run(dir: string) {
  let projectDir = dir;
  try {
    projectDir = await getProjectDir(dir);
  } catch (err) {
    console.log('Exiting…');
    process.exit();
  }
  await fs.mkdir(projectDir, { recursive: true });
  const templateDirs = await fs.readdir(path.resolve(__dirname, '..', TEMPLATES_DIR));
  const projectPath = path.resolve(process.cwd(), projectDir);

  const userFields = await getUserFields(defaultFields, templateDirs);

  const fields = {
    ...defaultFields,
    ...userFields,
  };

  const templatePath = path.resolve(__dirname, '..', TEMPLATES_DIR, fields.template);
  await scaffold(templatePath, projectDir, fields);
  const { stdout } = await install.projectInstall({
    cwd: projectPath,
  });
  console.log(stdout);
  console.log(`
    ${kleur.cyan(`cd ${projectDir}`)} to get started.

    ${kleur.cyan(`yarn build`)} to build the extension

    ${kleur.cyan(
      `yarn watch`
    )} to build and watch files for changes. Reload the extension and browser on change.
  `);
}

sade('create-extension [dir]', true)
  .version(version)
  .describe(
    'Initialize a Chrome Extension. If [dir] is omitted, you will be prompted to enter the directory.'
  )
  .example(`./some-directory`)
  .action(run)
  .parse(process.argv);
