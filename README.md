Projeto teste criado para a vaga de desenvolvedor front-end (uex).

As seguintes tecnologias foram utilizadas:

- Next.js
- TypeScript
- Styled Components
- Drizzle ORM
- SQLite
- dentre outras bibliotecas e ferramentas.

## Instruções para rodar o projeto

Após clonar o repositório, execute o comando abaixo para instalar as dependências:

```bash
npm install
```

Com as dependencias instaladas execute os comandos para criar o banco de dados:

```bash
npm run db:generate
```

```bash
npm run db:migrate
```

Para o funcionamento correto do projeto são necessárias as variáveis de ambiente, crie um arquivo `.env.local` na raiz do projeto seguindo o exemplo do arquivo `.env.example`.

Após a criação do arquivo de variáveis de ambiente, execute o comando abaixo para iniciar o projeto:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`.

## Estrutura do projeto

O projeto foi desenvolvido utilizando a arquitetura de pastas abaixo:

- `app`: Contém as páginas/rotas da aplicação.
- `components`: Contém os componentes reutilizáveis da aplicação.
- `database`: Contém os arquivos de configuração do banco de dados.
- `schemas`: Contém os arquivos de definição das validações.
- `types`: Contém os arquivos de definição de tipos e typeguards.
- `utils`: Contém os arquivos de funções utilitárias.

## Observações

- O projeto foi desenvolvido do dia 18/04 ao dia 21/04.
- O projeto foi desenvolvido com o intuito de demonstrar o conhecimento nas tecnologias utilizadas.
- Estou a disposição para esclarecer qualquer dúvida sobre o projeto ou decisões tomadas.
