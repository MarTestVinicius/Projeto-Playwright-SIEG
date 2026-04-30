const { expect } = require('@playwright/test');
const Componentes = require('../componets/componets.js');

class GestaoFuncionarioActions {
    constructor(page) {
        this.page = page; // Recebe a página do Playwright
        this.componentes = new Componentes(this.page);
    }

    async IrOpcaoPIM() {
        await this.page.locator('a[href="/web/index.php/pim/viewPimModule"]').click();
    }

    async ClicarAddEmployee(){
        await this.page.getByText('Add Employee').click();
    }

    async PreencherCamposNovoFuncionario(Fname,Lname){
        await this.page.getByPlaceholder('First Name').fill(Fname);
        await this.page.getByPlaceholder('Last Name').fill(Lname);
    }

    async SubmeterFormularioNovoFuncionario(){
        await this.page.locator('button[type="submit"]').click();
    }

    async ValidarToastNovoFuncionarioSucesso(){
        await this.componentes.ToastMensagem('Successfully Saved');
    }

    //Caso o campo Employee ID, no momento de criar um novo Empregado, não venha com valor único. Vai verificar o campo e adicionar +1 até ser um valor único
    async ValidarErroMensageCampoEmployeeID(){
    let erroExiste = await this.page.locator('span.oxd-input-field-error-message').isVisible();

    const campo = this.page.locator('input[wfd-id="id5"]');

    // 2. Inicia o loop: Enquanto o erro existir, ele continua executando
    while (erroExiste) {
    // Pega o valor atual, soma 1 e preenche novamente
    const valorAtualTexto = await campo.inputValue();
    const novoValor = (parseInt(valorAtualTexto) || 0) + 1;
    await campo.fill(novoValor.toString());

    // 3. Simula um clique fora do campo (blur) para forçar o sistema a validar o novo número
    await campo.blur(); 
    
    // 4. Aguarda um breve momento para dar tempo do sistema processar e a mensagem de erro sumir (500 milissegundos)
    await this.page.waitForTimeout(500); 

    // 5. Verifica novamente se o erro ainda está na tela para decidir se repete o loop ou sai dele
    erroExiste = await this.page.locator('span.oxd-input-field-error-message').isVisible();
      }

    console.log('Valor aceito com sucesso! A mensagem de erro sumiu.');
    }

    async ValidarNovoFuncionarioSucesso(){
         await this.page.getByPlaceholder('First Name').fill('Marcus');
    }

    async ValidarCamposObrigatoriosNovoFuncionario(mensagem,mensagem1){
        const SpanErro = this.page.locator('span.oxd-input-field-error-message');
        const countSpanErro = await SpanErro.count()

        if (countSpanErro === 3) {
        // Se encontrou exatamente 3 mensagens de erro
        await expect(SpanErro).toHaveText(mensagem);
        } else {
        await expect(SpanErro).toHaveText(mensagem1);
        }
    }
}

module.exports = GestaoFuncionarioActions;