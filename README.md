# Projeto TFC - Trybe Futebol Clube

Esse projeto foi realizado para exercitar o que foi aprendido no Módulo de Back End do curso da [Trybe](https://www.betrybe.com/), ou seja, todos os assuntos abordados durante o módulo, como `Docker`, `MySQL`, `NodeJs`, `arquitetura de software MSC`, `ORM Sequelize`, `autenticação com JWT`, `testes de integração`, `TypeScript`, `Programação Orientada a Objeto (POO)` e `princípios SOLID`.

O projeto consiste em uma aplicação `fullstack`, no qual a parte de `front-end` foi integralmente desenvolvida pela equipe da [Trybe](https://www.betrybe.com/), sendo o foco de desenvolvimento somente a parte de `back-end`.

Nesse projeto foi desenvolvida uma `REST API` através do `Node.js`, `Express` e `TypeScript`, utilizando arquitetura de software `MSC`. Além disso, foi adotado a prática de `POO`, pricípios `SOLID` e `TDD` (Test Driven Development).
Para a modelagem de dados foi utilizado o `Sequelize` como `ORM (Object-Relational Mapper) - Mapeador Objeto-Relacional`, ou seja, através dele foi possível criar o banco de dados, criar, popular e relacionar tabelas e também manipular os dados do database, realizando operações de `CRUD` (create, read, update e delete) utilizando apenas métodos JavaScript. Como sistema de gerenciamento de banco de dados, foi utilizado o MySQL.

A `API` é um sistema de gerenciamento de dados sobre partidas e classificações de futebol, no qual deveria alimentar a parte de front-end disponibilizado pela [Trybe](https://www.betrybe.com/).

Durante a pática de TDD, foram desenvolvidos testes de integração com as ferramentas `Mocha`, `Chai` e `Sinon`.

## Tecnologias

- [Node.js](https://nodejs.org/en/)

- [Express](https://expressjs.com/pt-br/)

- [TypeScript](https://www.typescriptlang.org/)

- [Sequelize](https://sequelize.org/)

- [joi](https://joi.dev/)

- [JWT](https://jwt.io/)

- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

- [Mocha](https://mochajs.org/)

- [Chai](https://www.chaijs.com/api/)

- [Sinon](https://sinonjs.org/)

- [MySQL](https://www.npmjs.com/package/bcryptjs)

- [Docker](https://www.docker.com/)

## Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone git@github.com:Lucas-Almeida-SD/Trybe-Projeto_30-TFC.git
$ cd Trybe-Projeto_30-TFC
```

<details>
  <summary><strong>Com Docker / Docker compose</strong></summary>

  ```bash
  # Realiza orquestração dos containers
  $ npm run compose:up
  ```

  A aplicação frontend estará disponível no seu browser pelo endereço http://localhost:3000.

  A aplicação backend estará disponível  na porta `3001`.

  O MySQL estará disponível  na porta `3002`.
</details>

<details>
  <summary><strong>Sem Docker</strong></summary>

  Vá até o caminho `./app/backend` e execute o comando abaixo:

  ```bash
   # Instala as dependências
    $ npm install

    # Iniciar o projeto
    $ npm start
  ```

  Vá até o caminho `./app/frontend` e execute o comando abaixo:

  ```bash
   # Instala as dependências
    $ npm install

    # Iniciar o projeto
    $ npm start
  ```

  Lembrando que você deverá possuir o sistema de banco de dados MySQL ativo em sua máquina, e você deverá inserir as suas credenciais no arquivo que se localiza em `./app/backend/.env.example`, e não se esqueça de renomeá-lo para `.env`.

  A aplicação frontend estará disponível no seu browser pelo endereço http://localhost:3000.

  A aplicação backend estará disponível  na porta que você inserir na variável de ambiente `APP_PORT` do arquivo `.env`.
</details>