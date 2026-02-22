export class CheckoutStepTwoPage {
    constructor(page) {
      this.page = page;
  
      // Title text
      this.stepTwoTitle = page.getByText('Checkout: Overview');
  
      // Finish button
      this.finishButton = page.locator('[data-test="finish"]');
    }
  
    async assertOnPage() {
      await this.stepTwoTitle.waitFor({ state: 'visible' });
      await this.page.waitForURL(/checkout-step-two\.html/);
    }
  
    // Finish checkout
    async finish() {
      await this.finishButton.click();
    }
  }