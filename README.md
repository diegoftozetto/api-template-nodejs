# api-template-nodejs

O intutito deste projeto é apresentar os mecanismos para elaboração de uma API em NodeJS.

## Instalar Recursos

Antes de iniciar a implementação da API é essencial a instalação do NodeJS, MongoDB (Database) e um editor de código (Sugestão: VS Code).

**NodeJS:**

`https://nodejs.org/en/`

**MongoDB:**

`https://www.mongodb.com/try/download/community`

**VS Code:**

`https://code.visualstudio.com/`

Outro recurso que garante agilidade durante o desenvolvimento do projeto é o Nodemon, pois permite a reinicialização do aplicativo conforme as alterações ocorrem.

**Nodemon**
```sh
$ npm install -g nodemon
```

## Instalar Dependências

**Instalar express**
```sh
$ npm install --save express
```
**Instalar mongoose**
```sh
$ npm install --save mongoose
```
**Instalar body-parse**
```sh
$ npm install --save body-parse
```
**Instalar bcryptjs**
```sh
$ npm install --save bcryptjs
```
**Instalar cors**
```sh
$ npm install --save cors
```

## Como Rodar

Para rodar o projeto atual, após a instalação dos recursos e depedências basta seguir os passos abaixo:

1. Criar database com o nome de 'db-template' no MongoDB:
    ```sql
    USE 'db-template';
    ```
2. Na pasta principal do projeto, executar o comando 'nodemon app.js' através do terminal:
    ```bash
    nodemon app.js
    ```

## Sobre a API

`POST/users`

Chamado para criar um novo usuário.

```json
{
  "name": "username",
  "email": "user@email.com",
  "password": "userpassword"
}
```

**Onde:**

`id` - ID do usuário. Este é gerado automaticamente.

`name` - Nome do usuário.

`password` - Senha do usuário.

Retorna JSON com uma mensagem, conforme o status:

* 201 - Created: Usuário adicionado com sucesso.
* 400 - Bad Request: Falha ao processar requisição. Parâmetro(s) inválido(s). | Falha ao processar requisição. Parâmetro inválido, email já cadastrado.
* 500 - Server Errors: Falha ao processar requisição. Erro ao adicionar usuário no Database.

```json
{
  "message": "Mensagem_do_Status"
}
```

`GET/users`

Chamado para retornar todos os usuários cadastrados.

Retorna um JSON, conforme o status:

* 200 - OK: JSON com os usuários.
* 500 - Server Errors: Falha ao processar requisição. Erro ao buscar usuários no Database.

`DELETE/users/{id}`

Chamado para remover um usuário específico do banco de dados.

Retorna JSON com uma mensagem, conforme o status:

* 200 - OK: Usuário removido com sucesso.
* 500 - Server Errors: Falha ao processar requisição. Erro ao remover usuário no Database.