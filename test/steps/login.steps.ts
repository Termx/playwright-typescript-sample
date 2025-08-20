import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../src/pageObject/loginPage';
import dotenv from 'dotenv';
import { expect } from 'playwright/test';

dotenv.config();

// GIVEN
Given('Navigate to the homepage', async function () {
    const page = this.page;
    const loginPage = new LoginPage(page);
    await loginPage.openApplication();
});

// WHEN
When('I perform Login steps', async function () {
    const page = this.page ;
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginLink();
    await loginPage.enterLoginDetails('customer@practicesoftwaretesting.com','welcome01');
    await loginPage.clickLoginButton();
});

When('I perform Login with invalid credentials', async function () {
    const page = this.page;
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginLink();
    await loginPage.enterLoginDetails('testing@gmail.com','1234');
    await loginPage.clickLoginButton();
});

When('I perform Login without an email and password', async function () {
    const page = this.page;
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginLink();
    await loginPage.enterLoginDetails('','');
    await loginPage.clickLoginButton();
});

// THEN
Then('I should see the user account page', async function () {
    const page = this.page;
    const loginPage = new LoginPage(page);
    expect(await page.locator('h1[data-test="page-title"]').textContent()).toBe('My account');
});

Then('I should see an error message indicating invalid credentials', async function () {
    const page = this.page;
    const loginPage = new LoginPage(page);
    expect(await page.locator('div[data-test="login-error"]').textContent()).toContain('Invalid email or password');
});

Then('I should see an error message indicating that the email is required', async function () {
    const page = this.page;
    const loginPage = new LoginPage(page);
    expect(await page.locator('div[id="email-error"]').textContent()).toContain('Email is required');
});

Then('I should see an error message indicating that the password is required', async function () {
    const page = this.page;
    const loginPage = new LoginPage(page);
    expect(await page.locator('div[id="password-error"]').textContent()).toContain('Password is required');
});