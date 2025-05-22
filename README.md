# 49Burguer API
Tech challenge FIAP Arquitetura de Software

### Grupo 49
![Logo do 49Burguer](./logo_49ers.jpg)
> RM 364485 - Ricardo Cezar Dias <br/>
> RM 123456 - Ricardo Cezar Dias <br/>
> RM 123456 - Ricardo Cezar Dias <br/>
> RM 123456 - Ricardo Cezar Dias <br/>
> RM 123456 - Ricardo Cezar Dias <br/>

## Instalação
1. Clone o repositório
    ```bash
    git clone https://github.com/seu-usuario/49burguer-api.git
    cd 49burguer-api
    ```
2. Crie um arquivo .env
    ```bash
        POSTGRES_USER=postgres
        POSTGRES_PASSWORD=postgres
        POSTGRES_DB=49burguer
        DATABASE_URL=postgres://postgres:postgres@db:5432/49burguer
    ```
    > **Não comitar o .env**

3. Suba os containers utilizando o Docker Compose:
     ```bash
         docker-compose up --build
     ```
    > Ao subir o container, já é pra rodar as migrações automaticamente

4. O banco de dados PostgreSQL e a aplicação estarão acessíveis na sua máquina local após o processo de inicialização.
    > - API: http://localhost:3000
    > - Documentação: http://localhost:3000/api-docs

### Rodando localmente SEM DOCKER
* Se preferir rodar a aplicação localmente sem o Docker, siga as instruções abaixo:
1. Instale as dependências
    ```bash
        npm install
    ```
2. Execute as migrações do banco de dados
    ```bash
        npx prisma migrate dev
    ```
3. Rode a aplicação localmente
    ```bash
        npm run dev
    ```

## Estrutura de diretórios
    src/
    ├── domain/              # Modelos de domínio e regras de negócio
    │   ├── entities/
    │   ├── services/
    │   └── repositories/    # Interfaces (ports) para repositórios
    ├── application/         # Casos de uso
    │   └── use-cases/
    ├── infrastructure/      # Implementações concretas (adapters)
    │   ├── database/
    │   ├── security/
    │   └── external-services/
    ├── interfaces/          # Controladores e rotas de API
    │   ├── http/
    │   │   ├── controllers/
    │   │   ├── routes/
    │   │   └── middlewares/
    │   └── docs/            # Documentação Swagger
    ├── config/              # Configurações da aplicação
    ├── utils/               # Utilitários e helpers
    └── server.ts            # Ponto de entrada da aplicação
