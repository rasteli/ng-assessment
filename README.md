# Avaliação NG

Projeto criado para uma posição na [ng.cash](https://ng.cash/)

## Techs

- Web

  - TypeScript
  - React
  - TailwindCSS
  - Vite

- Backend

  - TypeScript
  - NodeJS
  - Express
  - Vitest

## Executando o projeto

**Com docker-compose**

1. Navegue aos diretórios **web** e **backend** e execute: `npm install`

2. Execute o comando `docker-compose up` na raiz do projeto.

3. Navegue ao diretório **backend** e execute: `npx prisma migrate dev --name init` 

4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000/)

> Obs: caso o servidor não consiga se comunicar com o banco de dados ou o cliente, com o servidor, é sinal de que talvez o endereço IP que eles tentam acessar estejam errados.
> Para corrigir isso, [verifique o endereço IP do container desejado](https://www.freecodecamp.org/portuguese/news/como-obter-o-endereco-ip-de-um-conteiner-do-docker-explicado-e-com-exemplos/) e altere a variável de ambiente localizada no arquivo `docker-compose.yml`
> O IP do servidor vai aqui: `VITE_BASE_URL=http://SERVER_IP:3333`
> O IP do banco de dados vai aqui: `DATABASE_URL=postgresql://postgres:postgres@DATABASE_IP:5432/postgres?schema=public`
