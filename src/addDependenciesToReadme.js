import fs from 'fs';
import path from 'path';
import { log } from './log.js';

export async function addDependenciesToReadme() {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const readmePath = path.join(process.cwd(), 'README.md');

    if (!fs.existsSync(packageJsonPath)) {
      log('No package.json found. Skipping dependencies in README.', 'yellow');
      return;
    }
    if (!fs.existsSync(readmePath)) {
      log('No README.md found. Skipping dependencies section.', 'yellow');
      return;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = packageJson.dependencies || {};

    let depsText = '### Dependencies\n';
    for (const [dep, version] of Object.entries(dependencies)) {
      depsText += `- \`${dep}\`: \`${version}\`\n`;
    }
    depsText += '\n';

    let readmeContent = fs.readFileSync(readmePath, 'utf8');
    // Regex to find the existing "Dependencies" section and replace it
    readmeContent = readmeContent.replace(/(### Dependencies[\s\S]*?)(?=(## |### ))/, depsText);

    fs.writeFileSync(readmePath, readmeContent);
    log('Dependencies added to README.', 'green');
  } catch (err) {
    log(`Error adding dependencies to README: ${err.message}`, 'red');
  }
}
