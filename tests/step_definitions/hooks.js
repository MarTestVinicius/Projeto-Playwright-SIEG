// Arquivo: tests/step_definitions/hooks.js
const { Before, BeforeAll, After, setDefaultTimeout, AfterAll, Status } = require('@cucumber/cucumber');
const { chromium, request } = require('@playwright/test');

require('dotenv').config()
const fs = require('node:fs'); // Necessário para manipular os arquivos de vídeo

const LoginActions = require('../actions/loginAct.js');
const GestaoFuncionarioActions = require('../actions/gestaoFuncionarioAct.js');
const BuscaEFiltrosFuncionariosActions = require('../actions/buscaEfiltrosFuncionariosAct.js');




// Define o tempo limite padrão para os testes
setDefaultTimeout(120 * 1000);
let loginActions; 
let gestaoFuncionarioActions;
let buscaEFiltrosFuncionariosActions


// Cria as diretórios de evidências caso não existam no projeto
const dirVideos = './reports/videos/';
const dirScreenshots = './reports/screenshots/';
if (!fs.existsSync(dirVideos)) fs.mkdirSync(dirVideos, { recursive: true });
if (!fs.existsSync(dirScreenshots)) fs.mkdirSync(dirScreenshots, { recursive: true });

// Limpa e recria as pastas UMA VEZ antes de toda a bateria de testes começar
BeforeAll(async function () {
    // 1. Apaga as pastas antigas com todo o conteúdo dentro
    if (fs.existsSync(dirVideos)) {
        fs.rmSync(dirVideos, { recursive: true, force: true });
    }
    if (fs.existsSync(dirScreenshots)) {
        fs.rmSync(dirScreenshots, { recursive: true, force: true });
    }

    // 2. Cria as pastas novamente, vazias e prontas para os novos testes
    fs.mkdirSync(dirVideos, { recursive: true });
    fs.mkdirSync(dirScreenshots, { recursive: true });
    
    console.log('Pastas de evidências (Vídeos e Screenshots) limpas com sucesso para a nova execução!');
});

Before({ tags: "@preparar-dados-usuario" }, async function () {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    loginActions = new LoginActions(this.page);
    gestaoFuncionarioActions = new GestaoFuncionarioActions(this.page);
    await loginActions.LoginAdminCompleto(process.env.BASE_USERNAME , process.env.BASE_PASSWORD);
    await gestaoFuncionarioActions.IrOpcaoPIM();
    await gestaoFuncionarioActions.ClicarAddEmployee();
    await gestaoFuncionarioActions.PreencherCamposNovoFuncionario(process.env.BASE_FIRST_NAME , process.env.BASE_LAST_NAME);
    await gestaoFuncionarioActions.SubmeterFormularioNovoFuncionario();
    await gestaoFuncionarioActions.ValidarErroMensageCampoEmployeeID();
});


// Cria o navegador ANTES de cada cenário
Before(async function () {
    // Usamos o 'this' em vez de 'let'. O Cucumber compartilha o 'this' com todos os seus testes!
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext({
        recordVideo: {
            dir: dirVideos,
            size: { width: 1920, height: 1080 }
        }
    });
    this.page = await this.context.newPage(); 
});

After({ tags: "@preparar-dados-usuario" }, async function () {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    loginActions = new LoginActions(this.page);

    gestaoFuncionarioActions = new GestaoFuncionarioActions(this.page);
    buscaEFiltrosFuncionariosActions = new BuscaEFiltrosFuncionariosActions(this.page);
    await loginActions.LoginAdminCompleto(process.env.BASE_USERNAME,process.env.BASE_PASSWORD);
    await gestaoFuncionarioActions.IrOpcaoPIM();
    await buscaEFiltrosFuncionariosActions.PreencherNomePesquisaEmployee(process.env.BASE_FIRST_NAME)
    await buscaEFiltrosFuncionariosActions.SubmitSearch();
    await buscaEFiltrosFuncionariosActions.ValidarRetornoPesquisa();
    await buscaEFiltrosFuncionariosActions.RemoverUsuariosPesquisa();
});

// Fecha o navegador DEPOIS de cada cenário
After(async function ({pickle, result}) {
// A. Tirar Screenshot se falhou
    if (result?.status === Status.FAILED) {
        // Limpa o nome do cenário (pickle) para criar um nome de arquivo válido
        const nomeArquivo = pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
        const screenshotPath = `${dirScreenshots}${nomeArquivo}.png`;
        
        const image = await this.page.screenshot({ path: screenshotPath, fullPage: true });
        this.attach(image, 'image/png'); // Anexa no relatório do Cucumber
    }

    // B. Mapeia o caminho do vídeo antes de fechar a página
    const video = this.page.video();
    let videoPath;
    if (video) {
        videoPath = await video.path();
    }

    // C. FECHA O CONTEXTO (Obrigatório para o arquivo de vídeo ser finalizado corretamente)
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    
    // D. Mantém o vídeo apenas se houver falha
    if (result?.status === Status.FAILED) {
        console.log(`\n[FALHA] Vídeo salvo em: ${videoPath}`);
        this.attach(`Vídeo da falha salvo em: ${videoPath}`, 'text/plain');
    } else {
        // Se passou, deleta o vídeo para não ocupar espaço no HD
        if (videoPath && fs.existsSync(videoPath)) {
            fs.unlinkSync(videoPath);
        }
    }
    if (this.browser) await this.browser.close();
});


