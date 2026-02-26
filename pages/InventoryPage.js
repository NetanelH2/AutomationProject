import {expect} from '@playwright/test'

export class InventoryPage {
  constructor(page) {
    this.page = page
    this.productsTitle = page.getByText('Products')
    this.cartLink = page.locator('.shopping_cart_link')
    this.cartBadge = page.locator('.shopping_cart_badge')
    this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' })
  }

  async assertInventoryPageVisible() {
    await expect(this.productsTitle).toBeVisible()
  }

  async addFirstNItems(count) {
    const buttons = await this.addToCartButtons.all()
    let added = 0

    for (const btn of buttons) {
      await btn.click()
      added += 1
      if (added >= count) break
    }
  }

  async assertCartBadgeCount(expectedCount) {
    await expect(this.cartBadge).toHaveText(String(expectedCount))
  }

  async goToCart() {
    await this.cartLink.click()
  }
}