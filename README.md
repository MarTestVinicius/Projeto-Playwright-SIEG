# Projeto Automação de Testes OrangeHRM

Este documento contém a descrição do projeto de automação de testes para SIEG, cobrindo testes de Interface E2E do sistema OrangeHRM, projeto esse voltado para vaga de trabalho.

---

## 📌 Tecnologias Utilizadas

- Node.js 22.14
- Playwright 
- Cucumber

---

## 📂 Estrutura de projeto

- 📊 **/reports**  
Repositório onde serão guardadas as evidências caso algum cenário tenha falha como também o relatório final da execução.

- 📂**tests/actions**  
Pasta onde está guardadas todos métodos resposáveis pelas ações realizadas entro do sistema

- 📂**tests/componets**  
Pasta onde está guardadas as informações dos componentes a serem utilizados nas ações(actions)

- 📂**tests/features**  
Pasta onde está guardada os cenários em Gherkin

- 📂**tests/step_definitions**  
Pasta onde está guardada os step definidos pelas features

- **.env**  
arquivo de configuração de variáveis globais.

- **cucumber.json**  
arquivo onde estão dos diretórios de testes

---

## 🚀 Ferramentas para execução dos testes automatizados

### Pré-requisitos

- Node.js instalado
- Playwright instalado
- Cucumber instalado
- Extensão Cucumber

### Instalação

```bash
npm init playwright@latest
npm install --save-dev @cucumber/cucumber
```

### Execução dos testes

```bash
# Testes de E2E
npm test -> (package.json)
```

---

## 🧪 Cenários de Testes

### 🔹 Cenários de Autenticação de usuário

**Cenário de Login com Sucesso**

**Pré requisitos**
- aplicação disponível no ambiente de testes

**Cenário**
- Dado que a home page esteja disponível
- Quanto o preenchimento correto dos campos username e password for efetuada
- Então o Login admin será efetuado corretamente

**Cenário de Login com Erro do campo Username**

**Pré requisitos**
- aplicação disponível no ambiente de testes

**Cenário**
- Dado que a home page esteja disponível
- Quanto o preenchimento correto do campo password e com incorreto no campo Username for efetuada 
- Então a mensagem de erro 'Invalid credentials' será exibida

**Cenário de Login com Erro do campo password**

**Pré requisitos**
- aplicação disponível no ambiente de testes

**Cenário**
- Dado que a home page esteja disponível
- Quanto o preenchimento incorreto do campo password e correto no campo Username for efetuada 
- Então a mensagem de erro 'Invalid credentials' será exibida

**Cenário de Login com Erro do campo Vazios**

**Pré requisitos**
- aplicação disponível no ambiente de testes

**Cenário**
- Dado que a home page esteja disponível
- Quanto o preenchimento dos campos username e password for vazio
- Então a mensagem de alerta com a mensagem 'Required' será exibida


### 🔹 Cenários de gestão de funcionários

**Cadastro de novo Empregado**

**Pré requisitos**
- aplicação disponível no ambiente de testes

**Cenário**
- Dado que o admin home page esteja disponível
- Quanto a opção Add employee é selecionada no menu PIM
- Então o cadastro um usuário é feito com sucesso

**Edição de dados cadastrais do usuário**

**Pré requisitos**
- aplicação disponível no ambiente de testes

**Cenário**
- Dado que o admin home page esteja disponível
- Quanto a opção Employee List é selecionada no menu PIM
- Então é possível pesquisar um usuário pelo nome
- E editar seus dados cadastrais atravez da ação Editar

**Exclusão de Usuário Cadastrado**

**Pré requisitos**
- aplicação disponível no ambiente de testes

**Cenário**
- Dado que o admin home page esteja disponível
- Quanto a opção Employee List é selecionada no menu PIM
- Então é possível pesquisar um usuário pelo nome
- E excluir seus dados atravez da ação Remover

**Cadastro de usuário validando campos Obrigatórios**

**Pré requisitos**
- aplicação disponível no ambiente de testes

**Cenário**
- Dado que o admin home page esteja disponível
- Quanto a opção Add employee é selecionada no menu PIM
- Então verificar os campos obrigatórios no formulario com a opçção 'Create Login Details' desabilitada

**Cadastro de usuário validando campos Obrigatórios com detalhes de login**

**Pré requisitos**
- aplicação disponível no ambiente de testes

**Cenário**
- Dado que o admin home page esteja disponível
- Quanto a opção Add employee é selecionada no menu PIM
- Então verificar os campos obrigatórios no formulario com a opção 'Create Login Details' habilitada


### 🔹 Busca e Filtros

**Cenário de busca de empregado por nome**

**Pré requisitos**
- aplicação disponível no ambiente de testes
- Usuário Cadastrados Previamente

**Cenário**
- Dado que o admin home page esteja disponível
- Quanto a opção "Employee List" é selecionada no menu PIM
- Então pesquisar o funcionario pelo nome
- E vericar o resultado da pesquisa no campo Records Found

---

## 🐞 Bugs Encontrados

### Bug 1: Ceário de Exclusão de Empregado

**Descrição:** 
No cenário de Exclusão de Empregado, o Toast Mensage aparece duas vezes, um mostrando que o usuário foi removido e outro que não existe itens na pesquisa.


**Passos:**
1. Login na aplicação
2. Selecionar a opção PIM do Menu Lateral esquerdo
3. Na opção EmployeeList, fazer uma pesquisa por um Empregado existente
4. Clicar na ação de Exclusão ou pelo Checkbox ou botão de ação de remoção

**Esperado:**  
* A mensagem, "Remoção realizada com Sucesso", com toast com um texto mais adequado ou com um comportamento do componente diferente

**Atual:**
* Aparece dois toast mensage um que fala que removeu com Sucesso e mediatamente outro que não tem ninguém na lista.

---

### Bug 2: Validação de data futura

**Descrição:**  
Employee Id ser habilitado para alterações dado que o campo ID de usuário, por convenção é normalmente usado para identificar de maneira Única e Imutável um usuário

**Passos:**
1. Login na aplicação
2. Selecionar a opção PIM do Menu Lateral esquerdo
3. Clicar na opção Add Employee
4. Validar o Campo Employee Id

**Esperado:**  
* Como o esperado que o Campo ID seja Sempre Único para o usuário, não haveria necessidade de haver alteração do mesmo e até mesmo esse campo ser apresentado, ficando disponível no banco de dados.

**Atual:**  
* O campo Employee Id não teria, a princípio, necessidade de estar disponível ao usuário para remoção, ficando disponível somente a informação em banco de dados.

---

## 🔧 Sugestões de Melhoria

### 📌 Mudanças de Estilização durante o dia da aplicação
- As constantes mudanças, ao logo do dia, nas cores da aplicação prejudicaram a legibilidade. Em alguns casos, a falta de contraste entre a cor do texto e os novos fundos (backgrounds) dificultou a visualização de botões e o entendimento das ações.

### 📌 Tooltip Nas ações
- Aplicação de Tooltips nas ações tanto de Edição como Remoção de empregados

### 📌 Aplicação de conceitos de Narrador
- Aplicação propriedade de leitura para que o narrador possa ler corretamente os campos e dar a informação correta.

## 📄 Considerações Finais

O projeto de automação foi construída visando estabilidade e execução dos cenários propostos, bem como geração de relatório final do que foi executado e Screenshots/vídeos de possíveis cenários falhados(hooks.js)
