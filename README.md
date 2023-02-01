# BANCO-DIGITAL---API-REST-em-NodeJs-
Aplicação utiliza NodeJs e Express responsável por fazer uma API para um Banco Digital.

Operações realizadas:
-   Criar conta bancária
-   Listar contas bancárias
-   Atualizar os dados do usuário da conta bancária
-   Excluir uma conta bancária
-   Depósitar em uma conta bancária
-   Sacar de uma conta bancária
-   Transferir valores entre contas bancárias
-   Consultar saldo da conta bancária
-   Emitir extrato bancário

Como rodar o projeto

1 - Tenha certeza que o npm está instalado. 

Para isso use o comando npm -v

2 - Com o npm instalado rode o rode em seguida:

npm i

npm run dev

## Testando a aplicação - Endpoints


### Listar contas bancárias

#### `GET` `/contas?senha_banco=Cubos123Bank`
Curl: curl --request GET
--url 'http://localhost:3000/contas?senha_banco=Cubos123Bank'

Esse endpoint lista todas as contas bancárias existentes.
Para testar a aplicação usa-se uma senha como parametro na url. A senha utilizada foi: Cubos123Bank.

### Criar conta bancária

#### `POST` `/contas`
Curl: curl --request POST
--url 'http://localhost:3000/contas'

Esse endpoint cria uma conta bancária, vinculada a um número único para identificação da conta (número da conta).

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

-EX:
    {
    "nome": "Foo Bar 2",
    "cpf": "00011122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "foo@bar2.com",
    "senha": "12345"
}

-   Condições para acriação:
    -   CPF e Email devem ser um campo únicos.
    -   Verificar se todos os campos do corpo devem ser preenchidos.
    -   A senha deve apresentar 6 ou mais dígitos.


### Atualizar usuário da conta bancária

#### `PUT` `/contas/:numeroConta/usuario`
Curl: curl --request PUT
--url 'http://localhost:3000/contas/1/usuario'

Esse endpoint atualiza os dados do usuário de uma conta bancária.
O numero da conta bancária a ser alterad deve ser informada como paramentro na rota.

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

-EX:
    {
    "nome": "Foo Bar 2",
    "cpf": "00011122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "foo@bar2.com",
    "senha": "12345"
}

-   Condições para acriação:
    -   CPF e Email devem ser um campo únicos.
    -   Verificar se todos os campos do corpo devem ser preenchidos.
    -   A senha deve apresentar 6 ou mais dígitos.

### Excluir Conta

#### `DELETE` `/contas/:numeroConta`
Curl: curl --request DELETE
--url 'http://localhost:3000/contas/1'

Esse endpoint exclui uma conta bancária existente.
O Numero da conta bancária a ser excluida é passado como parâmetro na rota.


### Depositar

#### `POST` `/transacoes/depositar`
Curl: curl --request POST
--url 'http://localhost:3000/transacoes/depositar'

Esse endpoint adiciona o valor do depósito ao saldo de uma conta válida e registra essa transação.

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor

-   EX:
{
	"numero_conta": "1",
	"valor": 1900
}

### Sacar

#### `POST` `/transacoes/sacar`
Curl: curl --request POST
--url 'http://localhost:3000/transacoes/sacar'

Esse endpoint realiza o saque de um valor em uma determinada conta bancária e registra essa transação.

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor
    -   senha

-   EX:
{
	"numero_conta": "1",
	"valor": 1900,
    "senha": "123456"
}

### Tranferir

#### `POST` `/transacoes/transferir`
Curl: curl --request POST
--url 'http://localhost:3000/transacoes/transferir'

Esse endpoint permite a transferência de recursos (dinheiro) de uma conta bancária para outra e registra essa transação.


-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta_origem
    -   numero_conta_destino
    -   valor
    -   senha

-   EX:
{
	"numero_conta_origem": "1",
	"numero_conta_destino": "2",
	"valor": 200,
	"senha": "123456"
}

### Saldo

#### `GET` `/contas/saldo?numero_conta=123&senha=123`
Curl: curl --request GET
--url 'http://localhost:3000/contas/saldo?numero_conta=1&senha=123456'

Esse endpoint retorna o saldo de uma conta bancária.
O numero da conta e a senha são informadas como query params na url


### Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`
Curl: curl --request GET
--url 'http://localhost:3000/contas/extrato?numero_conta=2&senha=123456'

Esse endpoint lista as transações realizadas de uma conta específica.
O numero da conta e a senha são informadas como query params na url




tags: backend lógica nodeJS JavaScript



