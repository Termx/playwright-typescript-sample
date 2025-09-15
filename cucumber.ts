import { spawn, exec } from 'child_process';
import dotenv from 'dotenv';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

dotenv.config();

// Load config.yaml
const configFile = 'config.yaml';
let config: any;
if (fs.existsSync(configFile)) {
  config = yaml.load(fs.readFileSync(configFile, 'utf8')) as any;
} else {
  throw new Error('config.yaml not found. Please create it in the project root.');
}

const env = process.env.ENVIRONMENT || 'qa'; // Default to 'qa' if ENV is not set
const environmentConfig = config.environments[env] || config.environments.dev; // Fallback to 'dev' if env not found

// Merge common settings with environment-specific settings
const mergedConfig = {
  ...config.common,
  ...environmentConfig,
};

// Add config to process env to make it available to step definitions
process.env.CONFIG = JSON.stringify(mergedConfig);

// Default args
const cucumberArgs = [
  '--require-module', 'ts-node/register',
  '--require', 'test/steps/*.ts',
  '--require', 'src/hooks/*.ts',
  '--format', 'json:reports/cucumber_report.json',
];

// Forward CLI args (line numbers, tags, etc.), excluding environment variables
const userArgs = process.argv.slice(2).filter(arg => !arg.startsWith('ENVIRONMENT='));

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