Feature: Gestão de funcionários via PIM

 Scenario: Cadastro de novo Empregado
 Given que o admin home page esteja disponível
 When a opção Add employee é selecionada no menu PIM
 Then o cadastro de um novo empregado é feito com sucesso

 Scenario: Cadastro de usuário validando campos Obrigatórios
 Given que o admin home page esteja disponível
 When a opção Add employee é selecionada no menu PIM
 Then verificar os campos obrigatórios Campos no formulario com a opçção Create Login Details desabilitada