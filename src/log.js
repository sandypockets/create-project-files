import chalk from 'chalk';

export function log(msg, color = 'white') {
  try {
    console.log(chalk[color](msg));
  } catch (err) {
    console.log('Error logging message with chalk: ', err.message);
    console.log('Original message: ', msg);
  }
}
