import { BeforeAll, AfterAll, Before, After, setWorldConstructor, IWorldOptions, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

class CustomWorld extends World {
  browser: Browser | null;
  context: BrowserContext | null;
  page: Page | null;

  constructor(options: IWorldOptions) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
  }
}

setWorldConstructor(CustomWorld);

BeforeAll(async function (): Promise<void> {
  console.log('----------');
});

AfterAll(async function (): Promise<void> {
  console.log('----------');
});

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld) {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});