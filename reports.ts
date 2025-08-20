import reporter, { Options } from 'cucumber-html-reporter';
import fs from 'fs';

const options: Options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber_report.json',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "Test",
    "Browser": "Chromium",
    "Platform": process.platform,
    "Executed": "Local"
  }
};

fs.access(options.jsonFile!, fs.constants.F_OK, (err) => {
  if (err) {
    console.error("JSON report not found. Make sure tests ran successfully.");
  } else {
    console.log("JSON report found. Generating detailed HTML report...");
    reporter.generate(options);
  }
});