const { expect } = require('@playwright/test');

class Componentes {
   constructor(page) {
        this.page = page;
    }

    async ToastMensagem(mensagem) {
        const toast = await this.page.locator('.oxd-toast', { timeout: 15000 });
        await expect(toast).toContainText(mensagem)
    }

    async AlertErro(mensagem){
        const alertaErro = this.page.locator('.oxd-alert', { timeout: 15000 });
        await expect(alertaErro).toBeVisible({ timeout: 15000 });
        await expect(alertaErro).toHaveText(mensagem);
    }

    async SpanErro(mensagem){
        const SpanErro = this.page.locator('span.oxd-text',  { timeout: 15000 });
        await expect(SpanErro).toHaveText(mensagem);
    }
}

module.exports = Componentes;