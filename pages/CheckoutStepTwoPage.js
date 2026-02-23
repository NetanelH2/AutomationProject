// Remove comments
export class CheckoutStepTwoPage {
  constructor(page) {
    this.page = page

    // Title text
    this.stepTwoTitle = page.getByText('Checkout: Overview')

    // Finish button
    this.finishButton = page.locator('[data-test="finish"]')
  }

  async assertOnPage() {
    await this.stepTwoTitle.waitFor({state: 'visible'}) // You don't need this method, its only necessary so special situation related to a page taking a lot of time to load
    await this.page.waitForURL(/checkout-step-two\.html/) // No need for using Regex
  }

  // Finish checkout
  async finish() {
    await this.finishButton.click()
  }
}
