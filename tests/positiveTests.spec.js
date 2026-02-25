import {expect, test} from '@playwright/test'
import {testData} from '../data/testData.js'
import {InventoryPage} from '../pages/InventoryPage.js'
import {LoginPage} from '../pages/LoginPage.js'

test.describe('Positive Login Tests', () => {
  let loginPage
  let inventoryPage

  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page)
    inventoryPage = new InventoryPage(page)
    await loginPage.open()
  })

  for (const u of testData.positiveLoginUsers) {
    test(`Login succeeds: ${u.label}`, async ({page}) => {
      await loginPage.login(u.username, testData.password)

      await expect(page).toHaveURL((url) =>
        url.pathname.endsWith('/inventory.html'),
      )

      await inventoryPage.assertInventoryPageVisible()
    })
  }
})