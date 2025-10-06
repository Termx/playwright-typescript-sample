Basic template using Playwright (TypeScript) with Cucumber BDD, Page Object Model, and YAML.

Prerequisites:
- Node.js
- NPM

Install Dependencies:
```typescript
npm init -y // Initialize your Node.js if you have not done so already
npm install --save-dev @playwright/test playwright // Install Playwright with test runner
npm playwright install // Installs browser binaries
npm install --save-dev @cucumber/cucumber typescript ts-node @types/node // Install Cucumber & TypeScript releated packages
```
Initialize TypeScript configuration:
```typescript
    npx tsc --init
```
Run tests:
```typescript
npm run test
```
Run a specific file or test:
```typescript
npm run test test/features/xxxx.feature
npm run test test/features/xxxx.feature:xx (xx is line number)
