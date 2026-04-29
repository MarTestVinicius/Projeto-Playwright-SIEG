Feature: Busca e filtros VIA PIM

@preparar-dados-usuario
Scenario: Cenário de busca por nome
Given que o admin home page esteja disponível
When a opção Employee List é selecionada no menu PIM
Then é possível pesquisar o funcionario pelo nome
And vericar o resultado da pesquisa no campo Records Found