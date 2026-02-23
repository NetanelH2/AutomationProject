// Remove comments
import {expect, test} from '@playwright/test'
import {testData} from '../data/testData.js'
import {login} from '../helpers/login.helper.js'

// why you are writing the data in the test file? you should put it in the testData.js file and import it, this way its more maintainable and reusable across the tests

// Test data set for positive login scenarios
const positiveUsers = [
  {label: 'standard', username: testData.users.standard},
  {label: 'problem', username: testData.users.problem},
  {label: 'performance_glitch', username: testData.users.performanceGlitch},
  {label: 'error', username: testData.users.error},
  {label: 'visual', username: testData.users.visual},
]

test.describe('Positive Login Tests', () => {
  for (const u of positiveUsers) {
    test(`Login succeeds: ${u.label}`, async ({page}) => {
      // Act: login with valid credentials
      await login(page, {
        username: u.username,
        password: testData.password,
      })

      // Assert: user is redirected to inventory page
      await expect(page).toHaveURL(/inventory\.html/) // No need for using Regex

      // Assert: inventory page header is visible
      await expect(page.getByText('Products')).toBeVisible() // Locators should be in the POM class.
    })
  }
})
