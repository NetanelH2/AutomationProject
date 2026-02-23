import {LoginPage} from '../pages/LoginPage.js'

// you dont need an helper function for login, just call it from the LoginPage POM

/**
 * Reusable login helper.
 * Used by multiple tests to avoid repeating the same steps.
 */
export async function login(page, {username, password}) {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.login(username, password)
  return loginPage
}
