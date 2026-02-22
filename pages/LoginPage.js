export class LoginPage {
    constructor(page, baseUrl) {
        this.page = page;
        this.baseUrl = baseUrl;

        // Locators
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // Navigate to the login page
    async open() {
        await this.page.goto(this.baseUrl);
    }

    // Perform login action
    async login(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // Read login error text (for negative tests)
    async getErrorText(){
        await this.errorMessage.waitFor({ state: 'visible' });
        return await this.errorMessage.innerText();
    }
}