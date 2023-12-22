import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { log } from './log.js';
import { copyRecursiveSync } from './copyRecursiveSync.js';
import { addDependenciesToReadme } from './addDependenciesToReadme.js';
import { updateFiles } from './updateFiles.js';

export async function addProjectFiles() {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const sourceDir = path.join(__dirname, '../../templates');

    const items = fs.readdirSync(sourceDir).filter(item => item !== 'licenses');

    let selected = false;
    let answers;
    while (!selected) {
      answers = await inquirer.prompt([
        {
          type: 'checkbox',
          message: 'Select project files and directories to add (use spacebar to select)',
          name: 'selectedItems',
          choices: items.map(item => ({ name: item, value: item })),
        },
      ]);

      if (answers.selectedItems.length === 0) {
        const { goBack } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'goBack',
            message: 'No items were selected. Do you want to select again?',
            default: true,
          },
        ]);

        if (!goBack) break;
      } else {
        selected = true;
      }
    }

    let projectName = '';
    let githubUsername = '';
    let includeDependencies = false;

    const projectInfoFiles = ['README.md', 'CONTRIBUTING.md', 'DOCUMENTATION.md'];

    if (projectInfoFiles.some(file => answers.selectedItems.includes(file))) {
      const projectInfoAnswers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Enter your project name:',
          default: 'my-project',
        },
        {
          type: 'input',
          name: 'githubUsername',
          message: 'Enter your GitHub username:',
          default: 'username',
        },
      ]);

      projectName = projectInfoAnswers.projectName;
      githubUsername = projectInfoAnswers.githubUsername;

      if (answers.selectedItems.includes('README.md')) {
        const { includeDeps } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'includeDeps',
            message: 'Do you want to include a dependencies list in the README?',
            default: false,
          },
        ]);
        includeDependencies = includeDeps;
      }
    }

    log('Adding selected project files and directories...', 'white');
    answers.selectedItems.forEach(item => {
      const srcPath = path.join(sourceDir, item);
      const destPath = path.join(process.cwd(), item);
      copyRecursiveSync(srcPath, destPath);
      log(`✔ ${item}`, 'green');

      if (projectInfoFiles.includes(item)) {
        if (projectName || githubUsername) updateFiles(item, projectName, githubUsername);
      }
    });

    if (includeDependencies) await addDependenciesToReadme();

    return githubUsername;
  } catch (err) {
    log('Error adding project files: ' + err.message, 'red');
  }
}
