import { LoginPage } from '../pages/LoginPage.js';

/**
 * Reusable login helper.
 * Used by multiple tests to avoid repeating the same steps.
 */
export async function login(page, { baseUrl, username, password }) {
  const loginPage = new LoginPage(page, baseUrl);
  await loginPage.open();
  await loginPage.login(username, password);
  return loginPage;
}