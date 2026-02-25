import {expect} from '@playwright/test'

export class CheckoutStepTwoPage {
  constructor(page) {
    this.page = page
    this.stepTwoTitle = page.getByText('Checkout: Overview')
    this.finishButton = page.locator('[data-test="finish"]')
  }

  async assertCheckoutStepTwoVisible() {
    await expect(this.stepTwoTitle).toBeVisible()
    await expect(this.page).toHaveURL((url) =>
      url.pathname.endsWith('/checkout-step-two.html'),
    )
  }

  async finish() {
    await this.finishButton.click()
  }
}