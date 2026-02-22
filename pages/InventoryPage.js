export class InventoryPage {
    constructor(page) {
      this.page = page;
  
      // Page header text shown after successful login
      this.productsTitle = page.getByText('Products');
  
      // Shopping cart link/icon and badge (shows number of items)
      this.cartLink = page.locator('.shopping_cart_link');
      this.cartBadge = page.locator('.shopping_cart_badge');
  
      // "Add to cart" buttons (one per product card)
      this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    }
  
    // Assert that we're on the inventory page
    async assertOnPage() {
      await this.productsTitle.waitFor({ state: 'visible' });
    }
  
    /**
     * Add N items to cart by clicking the first N "Add to cart" buttons.
     * This avoids hardcoding product names and is enough for sanity (2 items).
     */
    async addFirstNItems(n) {
      for (let i = 0; i < n; i++) {
        await this.addToCartButtons.nth(i).click();
      }
    }
  
    // Assert cart badge equals expectedCount
    async assertCartCount(expectedCount) {
      await this.cartBadge.waitFor({ state: 'visible' });
      const badgeText = await this.cartBadge.innerText();
      const actual = Number(badgeText);
  
      if (actual !== expectedCount) {
        throw new Error(`Expected cart count ${expectedCount} but got ${badgeText}`);
      }
    }
  
    // Go to cart page
    async goToCart() {
      await this.cartLink.click();
    }
  }