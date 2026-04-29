Feature: Login

 Scenario: Cenário de Login com Sucesso
 Given que a home page esteja disponível
 When o preenchimento correto dos campos username e password for efetuada 
 Then o Login admin será efetuado corretamente

 Scenario: Cenário de Login com Erro do campo Username
 Given que a home page esteja disponível
 When o preenchimento correto do campo password e com incorreto no campo Username for efetuada 
 Then a mensagem de erro "Invalid credentials" será exibida

 Scenario: Cenário de Login com Erro do campo password
 Given que a home page esteja disponível
 When o preenchimento incorreto do campo password e correto no campo Username for efetuada 
 Then a mensagem de erro "Invalid credentials" será exibida

Scenario: Cenário de Login com Erro do campo Vazios
 Given que a home page esteja disponível
 When o preenchimento dos campos username e passador for vazio
 Then mensagem de alerta com a mensagem "Required" será exibida