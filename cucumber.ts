import { spawn, exec } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

// default args
const cucumberArgs = [
  '--require-module', 'ts-node/register',
  '--require', 'test/steps/*.ts',
  '--require', 'src/hooks/*.ts',
  '--format', 'json:reports/cucumber_report.json',
];

// Forward CLI args (line numbers, tags, etc.)
const userArgs = process.argv.slice(2);

// Final arguments list
const featureOrFilters = userArgs.length > 0 ? userArgs : ['test/features/*.feature'];

const finalArgs = [...cucumberArgs, ...featureOrFilters];

const cucumberProcess = spawn(
  'node',
  ['node_modules/@cucumber/cucumber/bin/cucumber-js', ...finalArgs],
  {
    stdio: 'inherit',
    env: process.env,
  }
);

cucumberProcess.on('close', (code) => {
  process.exit(code ?? 1);
});