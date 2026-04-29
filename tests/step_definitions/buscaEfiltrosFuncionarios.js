const {Given, When, Then} = require ("@cucumber/cucumber")
const LoginActions = require ('../actions/loginAct.js');
const GestaoFuncionarioActions = require ('../actions/buscaEfiltrosFuncionariosAct.js');
const BuscaEFiltrosFuncionariosActions = require ('../actions/buscaEfiltrosFuncionariosAct.js')
require('dotenv').config()

let gestaoFuncionarioActions
let buscaEFiltrosFuncionariosActions
const employeeListTitle = 'Employee Information'

When('a opção Employee List é selecionada no menu PIM', async function(){
    gestaoFuncionarioActions = new GestaoFuncionarioActions(this.page);
    buscaEFiltrosFuncionariosActions = new BuscaEFiltrosFuncionariosActions(this.page)
    await gestaoFuncionarioActions.IrOpcaoPIM();
})

Then('é possível pesquisar o funcionario pelo nome', async function () {
   await buscaEFiltrosFuncionariosActions.VerificarEmployeeListEstaAberto(employeeListTitle);
   await buscaEFiltrosFuncionariosActions.PreencherNomePesquisaEmployee(process.env.BASE_FIRST_NAME);
   await buscaEFiltrosFuncionariosActions.SubmitSearch();
});

Then('vericar o resultado da pesquisa no campo Records Found',async function () {
    await buscaEFiltrosFuncionariosActions.ValidarRetornoPesquisa();
});