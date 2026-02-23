
// Remove comments
export class CheckoutCompletePage {
    constructor(page) {
      this.page = page;
  
      // Title text
      this.completeTitle = page.getByText('Checkout: Complete!');
  
      // Thank you message (commonly appears on this page)
      this.thankYouHeader = page.getByRole('heading', { name: /thank you/i }); // You don't need this method, its only necessary so special situation related to a page taking a lot of time to load
    }
  
    async assertOnPage() {
      await this.completeTitle.waitFor({ state: 'visible' }); // No need for using Regex
      await this.page.waitForURL(/checkout-complete\.html/); // You don't need this method, its only necessary so special situation related to a page taking a lot of time to load
    }
  
    async assertThankYouVisible() {
      await this.thankYouHeader.waitFor({ state: 'visible' }); // No need for using Regex
    }
  }