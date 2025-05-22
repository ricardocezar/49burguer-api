# 49Burguer API
Tech challenge FIAP Arquitetura de Software

### Grupo 49
![Logo do 49Burguer](./logo_49ers.jpg)
> RM - Danilo Ganda <br/>
> RM - Fernando Nistal <br/>
> RM364485 - Ricardo Cezar Dias <br/>
> RM - Thiago Mendes <br/>

## Instalação
1. Clone o repositório
    ```bash
    git clone https://github.com/seu-usuario/49burguer-api.git
    cd 49burguer-api
    ```
2. Se certifique que o arquivo .env contem as informacoes de banco de dados
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
    > - BANCO DE DADOS: Dados de acesso no arquivo .env


## Estrutura de diretórios
    src/
    ├── domain/              # Modelos de domínio e regras de negócio
    │   ├── entities/
    │   ├── services/
    │   └── repositories/    # Interfaces (ports) para repositórios
    ├── application/         # Casos de uso
    │   └── dtos/
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
