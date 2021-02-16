import prompts from 'prompts';
import { Fields, TemplateDirs } from './types';

export async function getProjectDir(initialDir: string) {
  let projectDir = initialDir;
  if (!initialDir) {
    const { path } = await prompts({
      type: 'text',
      name: 'path',
      message: 'What is the project directory?',
      initial: 'my-extension',
    });
    projectDir = path;
  }
  return projectDir.trim();
}

export async function getUserFields(
  defaultFields: Fields = {},
  templateDirs: TemplateDirs
) {
  return prompts([
    {
      type: 'text',
      name: 'title',
      message: 'What is the name of the extension?',
      initial: defaultFields.title,
    },
    {
      type: templateDirs.length > 1 ? 'select' : null,
      name: 'template',
      message: 'Which extension template do you wish to use?',
      initial: templateDirs.indexOf(defaultFields.template),
      choices: templateDirs.map((td) => ({
        title: td,
        value: td,
      })),
    },
  ]);
}
