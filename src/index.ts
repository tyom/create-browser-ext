#!/usr/bin/env node
import sade from 'sade';
import { version } from '../package.json';
import { runner } from './runner';

const defaultInputs: ProjectDataDefaults = {
  templateName: 'chrome-react',
  projectDir: 'my-extension',
  title: 'New Chrome Extension',
  description: 'A Chrome extension built with a starter kit',
};

sade('create-browser-ext [dir]', true)
  .version(version)
  .describe(
    'Initialize a template to build browser extension. If [dir] is omitted, you will be prompted to enter the directory.'
  )
  .example(`./some-directory`)
  .action(runner(defaultInputs))
  .parse(process.argv);

export type ProjectData = {
  templatePath: string;
  templateName: string;
  projectPath: string;
  projectDir: string;
  title: string;
  description?: string;
};

export type ProjectDataDefaults = Partial<ProjectData>;
export type ProjectDataPreview = Omit<ProjectData, 'projectPath' | 'projectDir'>;
export type TemplateVariants = ProjectDataPreview[];
export type ScaffoldData = Omit<ProjectData, 'templateName' | 'projectDir'>;
