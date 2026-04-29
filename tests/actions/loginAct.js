const { expect } = require('@playwright/test');
const Componentes = require('../componets/componets.js');
require('dotenv').config()

class LoginActions {
    constructor(page) {
        this.page = page; // Recebe a página do Playwright
        this.componentes = new Componentes(this.page);
    }

    async IrPaginaInicialLogin() {
        await this.page.goto(process.env.BASE_URL);        
    }

    async SubmitFormularioAdmin(login, password) {
        await this.page.getByPlaceholder('Username').fill(login);
        await this.page.getByPlaceholder('Password').fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    async ValidarLoginSucesso() {
        await expect(this.page).toHaveURL(/.*dashboard/, { timeout: 15000 });     
    }

    async ValidarAlertErro(){
       await this.componentes.AlertErro('Invalid credentials');
    }

    async ValidarSpanErro(mensagem){
       await this.componentes.SpanErro(mensagem);
    }

    async LoginAdminCompleto(login,password){
        this.IrPaginaInicialLogin();
        this.SubmitFormularioAdmin(login,password);
        this.ValidarLoginSucesso();
    }
}

module.exports = LoginActions;