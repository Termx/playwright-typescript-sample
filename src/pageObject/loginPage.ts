import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private loginLink: string;
  private userEmail: string;
  private passText: string;
  private logInButton: string;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = 'a[data-test="nav-sign-in"]';
    this.userEmail = 'input[data-test="email"]';
    this.passText = 'input[data-test="password"]';
    this.logInButton = 'input[data-test="login-submit"]';
  }

  async openApplication(appURL?: string): Promise<void> {
    const url = appURL || process.env.BASE_URL || 'https://practicesoftwaretesting.com/';
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickLoginLink(): Promise<void> {
    await this.page.click(this.loginLink);
    await this.page.waitForTimeout(1000);
  }

  async enterLoginDetails(strUser: string, strPass: string): Promise<void> {
    await this.page.click(this.loginLink);
    await this.page.waitForTimeout(1000);
    await this.page.fill(this.userEmail, strUser);
    await this.page.fill(this.passText, strPass);
  }

  async clickLoginButton(): Promise<void> {
    await this.page.waitForTimeout(1000);
    await this.page.click(this.logInButton);
  }
}