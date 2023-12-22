import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { log } from './log.js';

function kebabToTitleCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function chooseLicense(sharedGithubUsername = '') {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const sourceDir = path.join(__dirname, '../templates');
    const licenseDir = path.join(sourceDir, 'licenses');

    const licenses = fs.readdirSync(licenseDir).map(file => path.basename(file, '.md'));
    const formattedLicenses = licenses.map(file => kebabToTitleCase(file));

    const licenseAnswers = await inquirer.prompt([
      {
        type: 'list',
        name: 'licenseType',
        message: 'Choose a license for your project:',
        choices: formattedLicenses,
      },
      {
        type: 'input',
        name: 'licenseName',
        message: sharedGithubUsername ? 'Change or press enter to continue: ' : 'Enter your name for the license:',
        default: sharedGithubUsername || 'username',
      },
    ]);

    const selectedLicenseFile = licenses[formattedLicenses.indexOf(licenseAnswers.licenseType)];

    const licensePath = path.join(licenseDir, `${selectedLicenseFile}.md`);
    let licenseContent = fs.readFileSync(licensePath, 'utf8');
    licenseContent = licenseContent.replace('[year]', new Date().getFullYear().toString());
    licenseContent = licenseContent.replace('[fullname]', licenseAnswers.licenseName);

    fs.writeFileSync(path.join(process.cwd(), 'LICENSE.md'), licenseContent);
    log(`✔ LICENSE (${licenseAnswers.licenseType})`, 'green');
  } catch (err) {
    log(`Error creating license: ${err.message}`, 'red');
  }
}
