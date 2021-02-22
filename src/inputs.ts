import { resolve } from 'path';
import prompts from 'prompts';
import { ProjectDataDefaults, ScaffoldData, TemplateVariants } from './';

export async function getUserInputs(
  inputs: ProjectDataDefaults = {},
  templateVariants: TemplateVariants
): Promise<ScaffoldData> {
  const initialVariantIndex = templateVariants.findIndex(
    (x) => x.templateName === inputs.templateName
  );
  return prompts([
    {
      type: templateVariants.length > 1 ? 'select' : null,
      name: 'templatePath',
      message: 'Which extension template do you wish to use?',
      initial: initialVariantIndex >= 0 ? initialVariantIndex : 0,
      choices: templateVariants.map(({ templatePath, title, description }) => ({
        title,
        description,
        value: templatePath,
      })),
    },
    {
      type: 'text',
      name: 'projectPath',
      message: 'What is the project directory?',
      initial: inputs.projectDir,
      format: (val) => resolve(process.cwd(), val),
    },
    {
      type: 'text',
      name: 'title',
      message: 'What is the name of the extension?',
      initial: inputs.title,
    },
    {
      type: 'text',
      name: 'description',
      message: 'What is the description of the extension?',
      initial: inputs.description,
    },
  ]);
}
