import { expect } from '@playwright/test'

export class CheckoutCompletePage {
  constructor(page) {
    this.page = page
    this.completeTitle = page.getByText('Checkout: Complete!')
    this.thankYouHeader = page.getByRole('heading', { name: /thank you/i })
  }

  async assertCheckoutCompleteVisible() {
    await expect(this.completeTitle).toBeVisible()
    await expect(this.page).toHaveURL((url) =>
      url.pathname.endsWith('/checkout-complete.html'),
    )
  }

  async assertThankYouVisible() {
    await expect(this.thankYouHeader).toBeVisible()
  }
}