import { expect, test } from '@playwright/test'
import { testData } from '../data/testData.js'
import { LoginPage } from '../pages/LoginPage.js'
import { InventoryPage } from '../pages/InventoryPage.js'
import { CartPage } from '../pages/CartPage.js'
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.js'
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage.js'
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage.js'

test.describe('Sanity - Full Purchase Flow', () => {
  test('User can complete checkout successfully (add 2 items)', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.open()
    await loginPage.login(testData.users.standard, testData.password)

    await expect(page).toHaveURL((url) => url.pathname.endsWith('/inventory.html'))

    const inventory = new InventoryPage(page)
    await inventory.assertInventoryPageVisible()

    const itemsToAdd = testData.inventory.addItemsCount
    await inventory.addFirstNItems(itemsToAdd)
    await inventory.assertCartBadgeCount(itemsToAdd)
    await inventory.goToCart()

    const cart = new CartPage(page)
    await cart.assertCartPageVisible()
    await cart.assertItemsCount(itemsToAdd)
    await cart.goToCheckout()

    const stepOne = new CheckoutStepOnePage(page)
    await stepOne.assertCheckoutStepOneVisible()
    await stepOne.fillAndContinue({
      firstName: testData.checkout.firstName,
      lastName: testData.checkout.lastName,
      zip: testData.checkout.zip,
    })

    const stepTwo = new CheckoutStepTwoPage(page)
    await stepTwo.assertCheckoutStepTwoVisible()
    await stepTwo.finish()

    const complete = new CheckoutCompletePage(page)
    await complete.assertCheckoutCompleteVisible()
    await complete.assertThankYouVisible()
  })
})