// Don't leave non-usefull comments in the code. Your code should be self-explanatory and easy to read without comments. If you feel the need to add a comment, try to refactor the code to make it more clear instead.
export class CartPage {
  constructor(page) {
    this.page = page

    // "Your Cart" title text
    this.cartTitle = page.getByText('Your Cart') // Why using Text locator?

    // Items in cart appear as elements with class "cart_item"
    this.cartItems = page.locator('.cart_item') // Same here, why using CSS locator instead of role or id?

    // Checkout button
    this.checkoutButton = page.getByRole('button', {name: 'Checkout'})
  }

  // Assert we are on cart page
  async assertOnPage() {
    await this.cartTitle.waitFor({state: 'visible'}) // You don't need this method, its only necessary so special situation related to a page taking a lot of time to load
    await this.page.waitForURL(/cart\.html/) // No need for using Regex
  }

  // Assert the cart has expected number of items
  async assertItemsCount(expectedCount) {
    await this.cartItems.first().waitFor({state: 'visible'}) // You don't need this method, its only necessary so special situation related to a page taking a lot of time to load
    const count = await this.cartItems.count() // count method is not async method

    if (count !== expectedCount) {
      throw new Error(
        `Expected ${expectedCount} items in cart but found ${count}`,
      )
    }
  }

  // Proceed to checkout step one
  async goToCheckout() {
    await this.checkoutButton.click()
  }
}
