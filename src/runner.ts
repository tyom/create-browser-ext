import { merge } from 'lodash';
import { getUserInputs } from './inputs';
import { mkdirSync, readdirSync, statSync } from 'fs';
import { scaffold } from './generators';
import install from 'pkg-install';
import kleur from 'kleur';
import path from 'path';
import { TemplateVariants, ProjectDataDefaults } from './';

const templatesPath = path.resolve(__dirname, '../templates');
const templateVariants = readdirSync(templatesPath).reduce(
  (acc, cur): TemplateVariants => {
    const templatePath = path.resolve(templatesPath, cur);
    const isValid =
      statSync(templatePath).isDirectory() &&
      !cur.startsWith('_') &&
      !cur.startsWith('.');

    if (!isValid) {
      return acc;
    }
    const pkg = require(path.join(templatePath, 'package.json'));
    return [
      ...acc,
      {
        templatePath,
        templateName: cur,
        title: pkg.name || cur,
        description: pkg.description,
      },
    ];
  },
  [] as TemplateVariants
);

export function runner(defaultInputs: ProjectDataDefaults) {
  return async function run(dir: string) {
    const inputs = merge(defaultInputs, {
      projectDir: dir,
    });

    let answers;
    try {
      answers = await getUserInputs(inputs, templateVariants);
    } catch (err) {
      console.log(`Exiting: ${err.message}`);
    }
    if (!answers?.projectPath) {
      process.exit();
    }

    mkdirSync(answers.projectPath, { recursive: true });

    await scaffold(answers);
    const { stdout } = await install.projectInstall({
      cwd: answers.projectPath,
    });

    console.log(stdout);
    console.log(`
      ${kleur.cyan(`cd ${path.basename(answers.projectPath)}`)} to get started.

      ${kleur.cyan(`yarn build`)} to build the extension

      ${kleur.cyan(
        `yarn watch`
      )} to build and watch files for changes. Reload the extension and browser on change.
    `);
  };
}
