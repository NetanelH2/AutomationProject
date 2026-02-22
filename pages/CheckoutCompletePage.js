export class CheckoutCompletePage {
    constructor(page) {
      this.page = page;
  
      // Title text
      this.completeTitle = page.getByText('Checkout: Complete!');
  
      // Thank you message (commonly appears on this page)
      this.thankYouHeader = page.getByRole('heading', { name: /thank you/i });
    }
  
    async assertOnPage() {
      await this.completeTitle.waitFor({ state: 'visible' });
      await this.page.waitForURL(/checkout-complete\.html/);
    }
  
    async assertThankYouVisible() {
      await this.thankYouHeader.waitFor({ state: 'visible' });
    }
  }