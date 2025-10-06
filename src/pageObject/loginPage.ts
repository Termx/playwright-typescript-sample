import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private loginLink: Locator;
  private userEmail: Locator;
  private passText: Locator;
  private logInButton: Locator;
  private forgotPasswordLink: Locator;
  private forgotPasswordField: Locator;
  private forgotPasswordButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.locator('a[data-test="nav-sign-in"]');
    this.userEmail = page.locator('input[data-test="email"]');
    this.passText = page.locator('input[data-test="password"]');
    this.logInButton = page.locator('input[data-test="login-submit"]');
    this.forgotPasswordLink = page.locator("[data-test='forgot-password-link']");
    this.forgotPasswordField = page.locator("input[id='email']");
    this.forgotPasswordButton = page.locator("[data-test='forgot-password-submit']");
  }

  async openApplication(appURL?: string): Promise<void> {
    const url = appURL || process.env.BASE_URL || 'https://practicesoftwaretesting.com/';
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickLoginLink(): Promise<void> {
    await this.loginLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async enterLoginDetails(strUser: string, strPass: string): Promise<void> {
    await this.loginLink.click();
    await this.userEmail.fill(strUser);
    await this.passText.fill(strPass);
  }

  async clickLoginButton(): Promise<void> {
    await this.logInButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickForgotPasswordLink(): Promise<void> {
    await this.forgotPasswordLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async requestPasswordReset(email: string): Promise<void> {
    await this.userEmail.fill(email);
    await this.forgotPasswordButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}