// Remove comments
// In addition, all you assertion method names are no expressive, you should use more descriptive names of what they are actually asserting, for example instead of assertOnPage you can have assertInventoryPageVisible or something like that, this way when you read the test you will understand better what is being asserted without needing to look at the implementation of the method.
import {expect, test} from '@playwright/test'
import {testData} from '../data/testData.js'

import {login} from '../helpers/login.helper.js'
import {CartPage} from '../pages/CartPage.js'
import {CheckoutCompletePage} from '../pages/CheckoutCompletePage.js'
import {CheckoutStepOnePage} from '../pages/CheckoutStepOnePage.js'
import {CheckoutStepTwoPage} from '../pages/CheckoutStepTwoPage.js'
import {InventoryPage} from '../pages/InventoryPage.js'

test.describe('Sanity - Full Purchase Flow', () => {
  test('User can complete checkout successfully (add 2 items)', async ({
    page,
  }) => {
    // 1) Login (positive)
    await login(page, {
      username: testData.users.standard,
      password: testData.password,
    })

    // Assert: user is redirected to inventory
    await expect(page).toHaveURL(/inventory\.html/) // No need for using Regex

    // 2) Inventory: add 2 items and go to cart
    const inventory = new InventoryPage(page)
    await inventory.assertOnPage()

    const itemsToAdd = testData.inventory.addItemsCount // should be 2
    await inventory.addFirstNItems(itemsToAdd)

    // Assert: cart badge shows 2 items
    await inventory.assertCartCount(itemsToAdd)

    // Go to cart
    await inventory.goToCart()

    // 3) Cart: verify 2 items and go to checkout
    const cart = new CartPage(page)
    await cart.assertOnPage()

    // Assert: cart page URL and item count
    await expect(page).toHaveURL(/cart\.html/) // No need for using Regex
    await cart.assertItemsCount(itemsToAdd)

    // Proceed to checkout (step one)
    await cart.goToCheckout()

    // 4) Checkout Step One: fill user info and continue
    const stepOne = new CheckoutStepOnePage(page)
    await stepOne.assertOnPage()

    await stepOne.fillAndContinue({
      firstName: testData.checkout.firstName,
      lastName: testData.checkout.lastName,
      zip: testData.checkout.zip,
    })

    // 5) Checkout Step Two: overview and finish
    const stepTwo = new CheckoutStepTwoPage(page)
    await stepTwo.assertOnPage()

    // Assert: we are on overview
    await expect(page).toHaveURL(/checkout-step-two\.html/) // No need for using Regex

    // Finish checkout
    await stepTwo.finish()

    // 6) Checkout Complete: verify success
    const complete = new CheckoutCompletePage(page)
    await complete.assertOnPage()

    // Assert: success page URL + thank you message visible
    await expect(page).toHaveURL(/checkout-complete\.html/) // No need for using Regex
    await complete.assertThankYouVisible()
  })
})
