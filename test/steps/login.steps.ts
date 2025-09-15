import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../src/pageObject/loginPage';
import { expect } from 'playwright/test';

let loginPage: LoginPage;

// GIVEN
Given('Navigate to the homepage', async function (this: any) {
    loginPage = new LoginPage(this.page);
    const config = JSON.parse(process.env.CONFIG || '{}');
    await loginPage.openApplication(config.base_url);
});

// WHEN
When('I perform Login steps', async function (this: any) {
    const config = JSON.parse(process.env.CONFIG || '{}');
    await loginPage.clickLoginLink();
    await loginPage.enterLoginDetails(config.credentials.good_email, config.credentials.good_pw);
    await loginPage.clickLoginButton();
});

When('I perform Login with invalid credentials', async function (this: any) {
    await loginPage.clickLoginLink();
    await loginPage.enterLoginDetails('testing@gmail.com','1234');
    await loginPage.clickLoginButton();
});

When('I perform Login without an email and password', async function (this: any) {
    await loginPage.clickLoginLink();
    await loginPage.enterLoginDetails('','');
    await loginPage.clickLoginButton();
});

// THEN
Then('I should see the user account page', async function (this: any) {
    expect(await this.page.locator('h1[data-test="page-title"]').textContent()).toBe('My account');
});

Then('I should see an error message indicating invalid credentials', async function (this: any) {
    expect(await this.page.locator('div[data-test="login-error"]').textContent()).toContain('Invalid email or password');
});

Then('I should see an error message indicating that the email is required', async function (this: any) {
    expect(await this.page.locator('div[id="email-error"]').textContent()).toContain('Email is required');
});

Then('I should see an error message indicating that the password is required', async function (this: any) {
    expect(await this.page.locator('div[id="password-error"]').textContent()).toContain('Password is required');
});