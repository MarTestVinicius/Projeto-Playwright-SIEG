# Automação de Testes

Este documento contém a descrição do projeto de automação de testes para SIEG, cobrindo testes de Interface E2E do sistema OrangeHRM

---

## 📌 Tecnologias Utilizadas

- Node.js
- Playwright
- cucumber

---

## 🚀 Como Executar os Testes

### Pré-requisitos

- Node.js instalado
- Playwright instalado
- cucumber instalado
- extensão cucumber

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

Cenário de Login com Sucesso

Pré requisitos
- aplicação disponível no ambiente de testes

Cenário
- Dado que a home page esteja disponível
- Quanto o preenchimento correto dos campos username e password for efetuada
- Então a pagina de admin com Login será apresentada corretamente

Cenário de Login com Erro do campo Username

Pré requisitos
- aplicação disponível no ambiente de testes

Cenário
- Dado que a home page esteja disponível
- Quanto o preenchimento correto do campo password e com incorreto no campo Username for efetuada 
- Então a mensagem de erro 'Invalid credentials' será exibida

Cenário de Login com Erro do campo password

Pré requisitos
- aplicação disponível no ambiente de testes

Cenário
- Dado que a home page esteja disponível
- Quanto o preenchimento incorreto do campo password e correto no campo Username for efetuada 
- Então a mensagem de erro 'Invalid credentials' será exibida

Cenário de Login com Erro do campo Vazios

Pré requisitos
- aplicação disponível no ambiente de testes

Cenário
- Dado que a home page esteja disponível
- Quanto o preenchimento dos campos username e passador for vazio
- Então mensagem de alerta com a mensagem 'Required' será exibida


### 🔹 Cenários de gestão de funcionários

Cadastro de novo Empregado

Pré requisitos
- aplicação disponível no ambiente de testes

Cenário
- Dado que o admin home page esteja disponível
- Quanto a opção 'Add employee' é selecionada no menu PIM
- Então o cadastro um usuário é feito com sucesso

Edição de dados cadastrais do usuário

Pré requisitos
- aplicação disponível no ambiente de testes

Cenário
- Dado que o admin home page esteja disponível
- Quanto a opção 'Employee List' é selecionada no menu PIM
- Então é possível pesquisar um usuário pelo nome
- E editar seus dados cadastrais atravez da ação Editar

Exclusão de Usuário Cadastrado

Pré requisitos
- aplicação disponível no ambiente de testes

Cenário
- Dado que o admin home page esteja disponível
- Quanto a opção 'Employee List' é selecionada no menu PIM
- Então é possível pesquisar um usuário pelo nome
- E excluir seus dados atravez da ação Remover

Cadastro de usuário validando campos Obrigatórios

Pré requisitos
- aplicação disponível no ambiente de testes

Cenário
- Dado que o admin home page esteja disponível
- Quanto a opção 'Add employee' é selecionada no menu PIM
- Então verificar os campos obrigatórios "Campos" no formulario com a opçção 'Create Login Details' desabilitada

|Campos     |
|First name |
|Last name  |


Cadastro de usuário validando campos Obrigatórios com detalhes de login

Pré requisitos
- aplicação disponível no ambiente de testes

Cenário
- Dado que o admin home page esteja disponível
- Quanto a opção "Add employee" é selecionada no menu PIM
- Então verificar os campos obrigatórios "Campos" no formulario com a opçção 'Create Login Details' habilitada

|Campos           |
|First name       |
|Last name        |
|Username         |
|Password         |
|Confirm Password |


### 🔹 Busca e Filtros

Cenário de busca de empregado por nome

Pré requisitos
- aplicação disponível no ambiente de testes
- Usuário Cadastrados Previamente

Cenário
- Dado que o admin home page esteja disponível
- Quanto a opção "Employee List" é selecionada no menu PIM
- Então é possível pesquisar o funcionario pelo nome
- E vericar o resultado da pesquisa no campo Records Found

---

## 🐞 Bugs Encontrados

### Bug 1: Validação de data obrigatória

**Descrição:** 
No cenário de Exclusão de Empregado, o Toast Mensage aparece duas vezes, um mostrado que o usuário foi removido e outro que não existe itens na pesquisa.


**Passos:**
1. Login na aplicação
2. Selecionar a opção PIM do Menu Lateral esquerdo
3. Na opção EmployeeList, fazer uma pesquisa por um Empregado existente
4. Clicar na ação de Exclusão ou pelo Checkbox ou botão de ação de remoção

**Esperado:**  
* A mensagem de possívelmente de  "Remoção realizada com Sucesso" com toast com um texto mais adequado ou com um comportamento do componente diferente

**Atual:**
* Aparece dois toast mensage um que fala que removeu com Sucesso e mediatamente outro que não tem ninguém na lista, ( isso prejudica a avalição de automação que a mensagem não conseguiria a mensagem de sucesso, justamente por ser muito rápido a informação).

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
* O campo Employee Id não teria, a princípio necessidade de estar disponível ao usuário para remoção, ficando disponível somente em banco de dados.

---

## 🔧 Sugestões de Melhoria

### 📌 Mudanças de Estilização durante o dia da aplicação
- Em muitos momentos vi que houveram mudanças do estilos de cores da aplicação, mas geraram em algumas situação uma dificuldade de visualizar alguns botões, entendimentos de textos e ações, justamente pelo texto não ser ajustado junto com o bg dos botões ou background de funções.

### 📝 Tooltip Nas ações
- Sugestão de Melhoria é aplicação de Tooltips nas ações tanto de Edição como Remoção de empregado, bem como aplicação propriedade de leitura para que o narrador possa ler corretamente os campos e dar a informação correta.

## 📄 Considerações Finais

O projeto de automação foi construída visando estabilidade e execução dos cenários propostos, bem como geração de relatório final do que foi executado e Screenshots/vídeos de possíveis cenários falhados(hooks.js)
