#!/usr/bin/env node

import inquirer from 'inquirer';
import { log } from './log.js';
import { chooseLicense } from './chooseLicense.js';
import { addProjectFiles } from './addProjectFiles.js';

async function main() {
  log(`[WELCOME] Create Project Files CLI`, 'blue');
  let sharedGithubUsername = '';
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What kind of files do you want to add?',
      choices: ['Project files and license', 'Project files', 'License', 'Cancel'],
      default: 'Project files and license',
    },
  ]);

  switch (action) {
    case 'Project files':
      sharedGithubUsername = await addProjectFiles();
      break;
    case 'License':
      await chooseLicense(sharedGithubUsername);
      break;
    case 'Project files and license':
      sharedGithubUsername = await addProjectFiles();
      await chooseLicense(sharedGithubUsername);
      break;
    case 'Cancel':
      log('Operation cancelled.', 'yellow');
      log('Bye!', 'blue');
      return;
    default:
      log('Invalid option selected.', 'red');
      log('This is likely an error with create-project-files.', 'red');
      return;
  }
  log('Process complete.', 'green');
}

main();
