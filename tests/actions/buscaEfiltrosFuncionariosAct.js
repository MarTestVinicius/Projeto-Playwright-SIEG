const { expect } = require('@playwright/test');
const Componentes = require('../componets/componets.js');

class BuscaEFiltrosFuncionariosActions {
    constructor(page) {
        this.page = page; // Recebe a página do Playwright
        this.componentes = new Componentes(this.page);
    }

    async IrOpcaoPIM() {
        await this.page.locator('a[href="/web/index.php/pim/viewPimModule"]').click();
    }

    async VerificarEmployeeListEstaAberto(title){
     const titleTable = await this.page.locator('.oxd-table-filter-header-title')
     await expect(titleTable).toHaveText(title)
    }

    async PreencherNomePesquisaEmployee(nome){
        const input = this.page.getByPlaceholder('Type for hints...').first();
        await input.fill(nome);
    }

    async SubmitSearch(){
        await this.page.locator('button[type="submit"]').click();
        
    }

    async ValidarRetornoPesquisa(){
        await this.page.waitForTimeout(2000);
        const employee = await this.page.getByRole('row', { timeout: 15000 }).filter({ hasText: process.env.BASE_FIRST_NAME }); //tempo bem a mais, contudo em alguns momentos do dia o carregamento da página demorava, e por isso um tempo maior foi necessário  
        const employeeCount = await employee.count();
        expect(employeeCount).toBeGreaterThanOrEqual(1);
    }

    async RemoverUsuariosPesquisa(){
     const checkbox = this.page.locator('span.oxd-checkbox-input').first();
     checkbox.click();
     await this.page.getByText('Delete Selected').click();
     await this.page.getByText('Yes, Delete').click();
     await this.componentes.ToastMensagem('No Records Found')
    }
}

module.exports = BuscaEFiltrosFuncionariosActions;