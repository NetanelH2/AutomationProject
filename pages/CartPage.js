import {expect} from '@playwright/test'

export class CartPage {
  constructor(page) {
    this.page = page
    this.cartTitle = page.locator('span.title')
    this.cartItems = page.locator('.cart_item')
    this.checkoutButton = page.getByRole('button', {name: 'Checkout'})
  }

  async assertCartPageVisible() {
    await expect(this.page).toHaveURL((url) =>
      url.pathname.endsWith('/cart.html'),
    )
    await expect(this.cartTitle).toHaveText('Your Cart')
  }

  async assertItemsCount(expectedCount) {
    await expect(this.cartItems).toHaveCount(expectedCount)
  }

  async goToCheckout() {
    await this.checkoutButton.click()
  }
}