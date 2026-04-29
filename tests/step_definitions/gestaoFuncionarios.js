const {Given, When, Then} = require ("@cucumber/cucumber")
const LoginActions = require('../actions/loginAct.js');
const GestaoFuncionarioActions = require('../actions/gestaoFuncionarioAct.js');
require('dotenv').config()


let loginActions; 
let gestaoFuncionarioActions;
const alertmessage3 = ['Required','Required','Employee Id already exists']
const alertmessage = ['Required','Required']

Given('que o admin home page esteja disponível', async function () {
    loginActions = new LoginActions(this.page);
    gestaoFuncionarioActions = new GestaoFuncionarioActions(this.page);
    await loginActions.LoginAdminCompleto(process.env.BASE_USERNAME , process.env.BASE_PASSWORD);
});

When('a opção Add employee é selecionada no menu PIM', async function () {
     await gestaoFuncionarioActions.IrOpcaoPIM();
     await gestaoFuncionarioActions.ClicarAddEmployee();
});

Then('o cadastro de um novo empregado é feito com sucesso', async function () {
      await gestaoFuncionarioActions.PreencherCamposNovoFuncionario(process.env.BASE_FIRST_NAME , process.env.BASE_LAST_NAME);
      await gestaoFuncionarioActions.SubmeterFormularioNovoFuncionario();
      await gestaoFuncionarioActions.ValidarErroMensageCampoEmployeeID();
      await gestaoFuncionarioActions.ValidarToastNovoFuncionarioSucesso();
});

Then('verificar os campos obrigatórios Campos no formulario com a opçção Create Login Details desabilitada', async function () {
      await gestaoFuncionarioActions.SubmeterFormularioNovoFuncionario();
      await gestaoFuncionarioActions.ValidarCamposObrigatoriosNovoFuncionario(alertmessage3,alertmessage)
});