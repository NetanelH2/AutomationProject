import { expect } from '@playwright/test'

export class CheckoutStepOnePage {
  constructor(page) {
    this.page = page
    this.stepOneTitle = page.getByText('Checkout: Your Information')
    this.firstNameInput = page.locator('[data-test="firstName"]')
    this.lastNameInput = page.locator('[data-test="lastName"]')
    this.zipInput = page.locator('[data-test="postalCode"]')
    this.continueButton = page.locator('[data-test="continue"]')
  }

  async assertCheckoutStepOneVisible() {
    await expect(this.stepOneTitle).toBeVisible()
    await expect(this.page).toHaveURL((url) =>
      url.pathname.endsWith('/checkout-step-one.html'),
    )
  }

  async fillAndContinue({ firstName, lastName, zip }) {
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.zipInput.fill(zip)
    await this.continueButton.click()
  }
}