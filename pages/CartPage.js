export class CartPage {
    constructor(page) {
      this.page = page;
  
      // "Your Cart" title text
      this.cartTitle = page.getByText('Your Cart');
  
      // Items in cart appear as elements with class "cart_item"
      this.cartItems = page.locator('.cart_item');
  
      // Checkout button
      this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }
  
    // Assert we are on cart page
    async assertOnPage() {
      await this.cartTitle.waitFor({ state: 'visible' });
      await this.page.waitForURL(/cart\.html/);
    }
  
    // Assert the cart has expected number of items
    async assertItemsCount(expectedCount) {
      await this.cartItems.first().waitFor({ state: 'visible' });
      const count = await this.cartItems.count();
  
      if (count !== expectedCount) {
        throw new Error(`Expected ${expectedCount} items in cart but found ${count}`);
      }
    }
  
    // Proceed to checkout step one
    async goToCheckout() {
      await this.checkoutButton.click();
    }
  }