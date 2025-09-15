import { defineConfig, devices } from '@playwright/test';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import dotenv from 'dotenv';

const config = yaml.load(fs.readFileSync('config.yaml', 'utf8')) as any;
const env = process.env.ENVIRONMENT || 'qa';
const environmentConfig = config.environments[env] || config.environments.dev;
const mergedConfig = { ...config.common, ...environmentConfig };

export default defineConfig({
  testDir: './test',
  timeout: 30 * 1000, // 30 seconds
  use: {
    headless: false,
    baseURL: mergedConfig.base_url,
    screenshot: 'only-on-failure',
    viewport: { width: 1920, height: 1080 },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});