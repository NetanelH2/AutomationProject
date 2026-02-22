export class CheckoutStepOnePage {
    constructor(page) {
      this.page = page;
  
      // Title text on the page
      this.stepOneTitle = page.getByText('Checkout: Your Information');
  
      // Input fields (Swag Labs uses these data-test attributes)
      this.firstNameInput = page.locator('[data-test="firstName"]');
      this.lastNameInput = page.locator('[data-test="lastName"]');
      this.zipInput = page.locator('[data-test="postalCode"]');
  
      // Continue button
      this.continueButton = page.locator('[data-test="continue"]');
    }
  
    async assertOnPage() {
      await this.stepOneTitle.waitFor({ state: 'visible' });
      await this.page.waitForURL(/checkout-step-one\.html/);
    }
  
    // Fill checkout form and continue
    async fillAndContinue({ firstName, lastName, zip }) {
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.zipInput.fill(zip);
      await this.continueButton.click();
    }
  }