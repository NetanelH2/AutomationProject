// Remove comments
import {expect, test} from '@playwright/test'
import {testData} from '../data/testData.js'
import {LoginPage} from '../pages/LoginPage.js'

// why you are writing the data in the test file? you should put it in the testData.js file and import it, this way its more maintainable and reusable across the tests

/**
 * Data-driven negative login scenarios.
 * Each object is one test case with inputs + expected error text.
 */
const negativeCases = [
  {
    name: 'locked_out_user should be blocked',
    username: testData.users.lockedOut,
    password: testData.password,
    expectedErrorContains: 'locked out',
  },
  {
    name: 'empty username',
    username: '',
    password: testData.password,
    expectedErrorContains: 'Username is required',
  },
  {
    name: 'empty password',
    username: testData.users.standard,
    password: '',
    expectedErrorContains: 'Password is required',
  },
  {
    name: 'empty username and password',
    username: '',
    password: '',
    // Swag Labs usually validates username first
    expectedErrorContains: 'Username is required',
  },
  {
    name: 'wrong password',
    username: testData.users.standard,
    password: 'wrong_password',
    expectedErrorContains: 'do not match any user',
  },
  {
    name: 'unknown username',
    username: 'unknown_user',
    password: testData.password,
    expectedErrorContains: 'do not match any user',
  },
]

test.describe('Negative Login Tests (Data-Driven Bonus)', () => {
  for (const tc of negativeCases) {
    test(`Negative login: ${tc.name}`, async ({page}) => {
      // Arrange: open login page using POM
      const loginPage = new LoginPage(page)
      await loginPage.open()

      // Act: attempt login with the current test case credentials
      await loginPage.login(tc.username, tc.password)

      // Assert: verify the expected error message is shown
      const err = await loginPage.getErrorText()
      await expect(err).toContain(tc.expectedErrorContains)

      // Assert: user should NOT be redirected to inventory page
      await expect(page).not.toHaveURL(/inventory\.html/) // No need for using Regex
    })
  }
})
