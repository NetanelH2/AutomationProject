import {expect, test} from '@playwright/test'
import {testData} from '../data/testData.js'
import {LoginPage} from '../pages/LoginPage.js'

test.describe('Negative Login Tests (Data-Driven)', () => {
  let loginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.open()
  })

  for (const tc of testData.negativeLoginCases) {
    test(`Negative login: ${tc.name}`, async ({ page }) => {
      await loginPage.login(tc.username, tc.password)

      await expect(loginPage.getErrorLocator()).toContainText(tc.expectedErrorContains)
      await expect(page).not.toHaveURL((url) => url.pathname.endsWith('/inventory.html'))
    })
  }
})