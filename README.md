# Projeto Automação de Testes OrangeHRM

Este documento apresenta um projeto de automação de testes, com foco em testes de interface no sistema OrangeHRM, desenvolvido para um processo seletivo da empresa SIEG.

---

## 📌 Tecnologias Utilizadas

- Node.js 22.14
- Playwright 
- Cucumber

---

## 📂 Estrutura de projeto

- 📊 **/reports**  
Repositório onde serão guardadas as evidências caso algum cenário tenha falha e relatório final da execução.

- 📂**tests/actions**  
Pasta onde contem todos métodos resposáveis pelas ações realizadas dentro do projeto.

- 📂**tests/componets**  
Pasta onde contem as informações dos componentes a serem utilizados nas ações(actions).

- 📂**tests/features**  
Pasta onde contem os cenários em Gherkin.

- 📂**tests/step_definitions**  
Pasta onde contem as definições de passo-a-passo informadas pelas features.

- **.env**  
Arquivo de configuração de variáveis globais.

- **cucumber.json**  
Arquivo onde contem os diretórios de testes.

---

## 🚀 Ferramentas para execução dos testes automatizados

### Pré-requisitos

- Node.js instalado
- Playwright instalado
- Cucumber instalado
- Extensão Cucumber

### Instalação

```bash
npm init playwright@latest (Playwright)
npm install --save-dev @cucumber/cucumber (Cucumber)
```

### Execução dos testes

```bash
# Testes de E2E
npm test -> (package.json)
```

---

## 🧪 Cenários de Testes

### 🔹 Cenários de Autenticação de usuário

**1. Cenário de Login com Sucesso**

**Pré requisitos**
- Aplicação deve estar disponível no ambiente de testes

**Cenário**
- Dado que a home page esteja disponível
- Quanto o preenchimento correto dos campos username e password for efetuada
- Então o Login admin será efetuado corretamente



**2. Cenário de Login com Erro do campo Username**

**Pré requisitos**
- Aplicação deve estar disponível no ambiente de testes

**Cenário**
- Dado que a home page esteja disponível
- Quanto o preenchimento correto do campo password e incorreto no campo Username for efetuada 
- Então a mensagem de erro 'Invalid credentials' será exibida



**3. Cenário de Login com Erro do campo password**

**Pré requisitos**
- Aplicação deve estar disponível no ambiente de testes

**Cenário**
- Dado que a home page esteja disponível
- Quanto o preenchimento incorreto do campo password e correto no campo Username for efetuada 
- Então a mensagem de erro 'Invalid credentials' será exibida



**4. Cenário de Login com Erro do campo Vazios**

**Pré requisitos**
- Aplicação deve estar disponível no ambiente de testes

**Cenário**
- Dado que a home page esteja disponível
- Quanto o preenchimento dos campos username e password for vazio
- Então a mensagem de alerta com a mensagem 'Required' será exibida



### 🔹 Cenários de gestão de funcionários

**1. Cadastro de novo Empregado**

**Pré requisitos**
- Aplicação deve estar disponível no ambiente de testes

**Cenário**
- Dado que o admin home page esteja disponível
- Quanto a opção Add employee é selecionada no menu PIM
- Então o cadastro um usuário é feito com sucesso



**2. Edição de dados cadastrais do usuário**

**Pré requisitos**
- Aplicação deve estar disponível no ambiente de testes

**Cenário**
- Dado que o admin home page esteja disponível
- Quanto a opção Employee List é selecionada no menu PIM
- Então é possível pesquisar um usuário pelo nome
- E editar seus dados cadastrais através da ação Editar



**3. Exclusão de Usuário Cadastrado**

**Pré requisitos**
- Aplicação deve estar disponível no ambiente de testes

**Cenário**
- Dado que o admin home page esteja disponível
- Quanto a opção Employee List é selecionada no menu PIM
- Então é possível pesquisar um usuário pelo nome
- E excluir seus dados através da ação Remover



**4. Cadastro de usuário validando campos Obrigatórios**

**Pré requisitos**
- Aplicação deve estar disponível no ambiente de testes

**Cenário**
- Dado que o admin home page esteja disponível
- Quanto a opção Add employee é selecionada no menu PIM
- Então verificar os campos obrigatórios no formulário com a opção 'Create Login Details' desabilitada



**5. Cadastro de usuário validando campos Obrigatórios com detalhes de login**

**Pré requisitos**
- Aplicação deve estar disponível no ambiente de testes

**Cenário**
- Dado que o admin home page esteja disponível
- Quanto a opção Add employee é selecionada no menu PIM
- Então verificar os campos obrigatórios no formulario com a opção 'Create Login Details' habilitada



### 🔹 Busca e Filtros

**1. Cenário de busca de empregado por nome**

**Pré requisitos**
- Aplicação deve estar disponível no ambiente de testes
- Usuário cadastrado previamente

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
4. Clicar na ação de Exclusão pelo Checkbox ou botão de ação de remoção

**Esperado:**  
* Aparecer apenas um toast com a mensagem "Remoção com sucesso".

**Atual:**
* Aparece dois toast mensage, um que removeu com Sucesso e imediatamente outro que não tem ninguém na lista de empregados.

---

### Bug 2: Habilitação do campo ID do Empregado

**Descrição:**  
O campo "Employee Id" atualmente está habilitado para alterações no momomento da criação e edição de um empregado. Por convenção, é normal identificar essa informação de maneira única e inalterada para cada usuário

**Passos 1:**
1. Login na aplicação
2. Selecionar a opção PIM do Menu Lateral esquerdo
3. Clicar na opção Add Employee
4. Validar o campo Employee Id

**Passos 2:**
1. Login na aplicação
2. Selecionar a opção PIM do Menu Lateral esquerdo
3. pesquisar um empregado na opção EmployeeList
4. com a ação editar realida, validar o campo Employee Id

**Esperado:**  
* O Campo Employee ID deve sempre ser único e não editável para cada usuário, ficando apenas armazenado no banco de dados.

**Atual:**  
* O campo Employee Id é apresentado na tela de edição e criação de um empregado sendo possível alterar o campo de maneira livre.

---

## 🔧 Sugestões de Melhoria

### 📌 Mudanças de estilização durante o dia da aplicação
- As constantes mudanças das cores principais da aplicação prejudicaram a legibilidade. Há casos, onde o contraste entre a cor do texto e os  backgrounds dificultaram a visualização de textos dos botões e o entendimento das ações.

### 📌 Tooltip Nas ações
- Aplicação de Tooltips nas ações tanto de edição como remoção de empregados na lista de pesquisa.

### 📌 Aplicação de conceitos de Leitores de tela
- Aplicação de propriedades de leitura de tela que possa ler corretamente os campos e dar a informação correta.

## 📄 Considerações Finais

O projeto de automação foi construído visando estabilidade e execução dos cenários propostos, bem como geração de relatório final do que foi executado e Screenshots/vídeos de possíveis cenários falhados(hooks.js).
