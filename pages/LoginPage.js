// Remove comments
export class LoginPage {
  constructor(page) {
    this.page = page

    // Locators
    this.usernameInput = page.getByPlaceholder('Username')
    this.passwordInput = page.getByPlaceholder('Password')
    this.loginButton = page.getByRole('button', {name: 'Login'})
    this.errorMessage = page.locator('[data-test="error"]')
  }

  // Navigate to the login page
  async open() {
    await this.page.goto('/') // baseUrl is already set in the Playwright config, no need to use it here
  }

  // Perform login action
  async login(username, password) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  // Read login error text (for negative tests)
  async getErrorText() {
    await this.errorMessage.waitFor({state: 'visible'}) // You don't need this method, its only necessary so special situation related to a page taking a lot of time to load
    return await this.errorMessage.innerText()
  }
}
