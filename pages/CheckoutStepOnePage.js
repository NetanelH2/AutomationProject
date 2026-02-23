// Remove comments
export class CheckoutStepOnePage {
  constructor(page) {
    this.page = page

    // Title text on the page
    this.stepOneTitle = page.getByText('Checkout: Your Information')

    // Input fields (Swag Labs uses these data-test attributes)
    this.firstNameInput = page.locator('[data-test="firstName"]')
    this.lastNameInput = page.locator('[data-test="lastName"]')
    this.zipInput = page.locator('[data-test="postalCode"]')

    // Continue button
    this.continueButton = page.locator('[data-test="continue"]')
  }

  async assertOnPage() {
    await this.stepOneTitle.waitFor({state: 'visible'}) // You don't need this method, its only necessary so special situation related to a page taking a lot of time to load
    await this.page.waitForURL(/checkout-step-one\.html/) // No need for using Regex
  }

  // Fill checkout form and continue
  async fillAndContinue({firstName, lastName, zip}) {
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.zipInput.fill(zip)
    await this.continueButton.click()
  }
}
