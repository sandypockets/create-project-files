import fs from 'fs';
import path from 'path';
import { log } from './log.js';

export function copyRecursiveSync(src, dest) {
  try {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
      fs.mkdirSync(dest, { recursive: true });
      fs.readdirSync(src).forEach(childItemName => {
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  } catch (err) {
    log(`Error copying files synchronously: ${err.message}`, 'red');
  }
}
