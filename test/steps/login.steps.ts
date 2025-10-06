import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../src/pageObject/loginPage';
import { expect } from 'playwright/test';

let loginPage: LoginPage;

// GIVEN
Given('I navigate to the login page', async function (this: any) {
    loginPage = new LoginPage(this.page);
    const config = JSON.parse(process.env.CONFIG || '{}');
    await loginPage.openApplication(config.base_url);
    await loginPage.clickLoginLink();
});

// WHEN
When('I enter valid credentials', async function (this: any) {
    const config = JSON.parse(process.env.CONFIG || '{}');
    await loginPage.enterLoginDetails(config.credentials.good_email, config.credentials.good_pw);
    await loginPage.clickLoginButton();
});

When('I perform Login with invalid credentials', async function (this: any) {
    await loginPage.enterLoginDetails('testing@gmail.com','1234');
    await loginPage.clickLoginButton();
});

When('I perform Login without an email and password', async function (this: any) {
    await loginPage.enterLoginDetails('','');
    await loginPage.clickLoginButton();
});

When('I request a password reset', async function (this: any) {
    const config = JSON.parse(process.env.CONFIG || '{}');
    await loginPage.clickForgotPasswordLink();
    await loginPage.requestPasswordReset(config.credentials.good_email);
});

When('I request a password reset with an invalid email', async function (this: any) {
    const config = JSON.parse(process.env.CONFIG || '{}');
    await loginPage.clickForgotPasswordLink();
    await loginPage.requestPasswordReset(config.credentials.bad_email);
});

When('I request a password reset without an email address', async function (this: any) {
    const config = JSON.parse(process.env.CONFIG || '{}');
    await loginPage.clickForgotPasswordLink();
    await loginPage.requestPasswordReset('');
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

Then('I should see a password reset confirmation message', async function (this: any) {
    expect(await this.page.locator('div[role="alert"]').textContent()).toContain('Your password is successfully updated!')
});

Then('I should see password reset field display an invalid error message', async function (this: any) {
    expect(await this.page.locator('div[id="email-error"]').textContent()).toContain('The selected email is invalid.')
});

Then('I should see password reset field display an error message', async function (this: any) {
    expect(await this.page.locator('div[id="email-error"]').textContent()).toContain('Email is required')
});