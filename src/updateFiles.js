import fs from 'fs';
import path from 'path';
import { log } from './log.js';

export function updateFiles(fileName, projectName, githubUsername) {
  try {
    const filePath = path.join(process.cwd(), fileName);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (projectName) content = content.replace(/\[project_name]/g, projectName);
      if (githubUsername) content = content.replace(/\[github_username]/g, githubUsername);
      fs.writeFileSync(filePath, content);
      log(`${fileName} updated with project information.`, 'green');
    } else {
      log(`${fileName} not found.`, 'yellow');
    }
  } catch (err) {
    log(`Error updating ${fileName}: ${err.message}`, 'red');
  }
}
