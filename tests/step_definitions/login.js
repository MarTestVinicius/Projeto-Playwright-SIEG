const {Given, When, Then} = require ("@cucumber/cucumber")
const LoginActions = require('../actions/loginAct.js');

let loginActions;
const mensagem = ['Required', 'Required'];

Given('que a home page esteja disponível', async function () {
    loginActions = new LoginActions(this.page);
    await loginActions.IrPaginaInicialLogin();
});

When('o preenchimento correto dos campos username e password for efetuada', async function () { 
 await loginActions.SubmitFormularioAdmin('admin', 'admin123');
});

 When('o preenchimento incorreto do campo password e correto no campo Username for efetuada', async function () {
 await loginActions.SubmitFormularioAdmin('admin', 'admin123456');
});

When('o preenchimento correto do campo password e com incorreto no campo Username for efetuada', async function () { 
 await loginActions.SubmitFormularioAdmin('admin456', 'admin123');
});

When('o preenchimento dos campos username e passador for vazio', async function () { 
 await loginActions.SubmitFormularioAdmin('','');
});

 Then('a pagina de admin com Login será apresentada corretamente',async function () {
   await loginActions.ValidarLoginSucesso();
}); 

 Then('a mensagem de erro "Invalid credentials" será exibida',async function () {
   await loginActions.ValidarAlertErro();
});

 Then('mensagem de alerta com a mensagem "Required" será exibida',async function () {

   await loginActions.ValidarSpanErro(mensagem);
});