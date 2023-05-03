<p align="center">
  <h1 align="center">
    PD Next João Paulo
  </h1>
</p>

## 🖥️ Descrição do Projeto

Projeto fullstack de um dashboard que monitora horas trabalhadas:

- Criação de usuários / squads / relatório trabalhado.
- Visualização de todos os usuários / squads.
- Visualização única de squad onde se pode ver:
   - Todos funcionários vinculados a essa squad
   - Filtrar relatórios entre 2 datas selecionadas
   - Horas totais trabalhadas entre as 2 datas
   - Horas/Dia trabalhadas em média entre as 2 datas


## 🗒️ Índice

- [💻 Tecnologias e Ferramentas](#💻-tecnologias-e-ferramentas)
- [💁🏻‍♂️ Instalação Manual](#💁🏻‍♂️-instalação-manual)
- [🚀 API](#🚀-api)

## 💻 Tecnologias e Ferramentas
<div align="flex-start">
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white">

</div>

---

## 💁🏻‍♂️ Instalação Manual

- Clone o projeto usando um desses 2 comandos

```bash
#Clone via https
$ git clone https://github.com/OliveiraaJP/Pd-Next.git

OU
#Clone via ssh
$ git clone git@github.com:OliveiraaJP/Pd-Next.git
```

- Crie um banco de dados local mysql e guarde o nome pois irá precisar adiciona-lo no .env do projeto (variáveis de ambiente)

- Criar um arquivo .env seguindo o documento .env.example da raíz do projeto, subtituindo:
  - USER -> seu usuário mysql
  - PASSWORD -> sua senha do mysql
  - HOST -> o host que se for local será 'localhost'
  - PORT -> a porta que irá rodar o banco, a porta padrão é '3306'
  - DATABASE -> o nome do banco de dados mysql utilizado, atenção pra ter o exato mesmo nome que seu banco criado localmente

- Rode os seguintes comandos dentro da pasta do projeto clonado

```bash
$ npm i

$ npx prisma migrate dev

$ npx prisma generate

$ npm run build

$ npm start
```

- Ao invés de rodar "npm run build" e "npm start" pode optar apenas por rodar "npm run dev" para testar em ambiente de desenvolvimento

- Na pasta raiz do projeto existe um arquivo chamado "Insomnia_http_requests.json", você pode importa-lo para seu Imsomnia para ter requests já montadas no seu aplicativo

- Accesse em seu navegador o link localhost:3000 ou 127.0.0.1:3000

---

## 🚀 API:

```yml
GET /api/employee
    - Rota que retorna rodos os funcionários/usuários
    - headers: {}
    - body: {}
    - statusCode: 200
    - response: {
       - "message": "Employees recebidos",
       - "data": [
                {
                   "id": number,
                   "name": string,
                   "estimatedHours": number,
                   "squadId": number
                }
              ]
    }
```

```yml
GET /api/squad
    - Rota que retorna todos as squads
    - headers: {}
    - body: {}
    - statusCode: 200
    - response: {
       - "message": "Squads recebidos",
       - "data": [
                {
                   "id": number,
                   "name": string,            
                }
              ]
    }
```

```yml
GET /api/squad/:squadId/members
    - Rota que retorna todos os funcionários daquela squad
    - headers: {}
    - body: {}
    - query: {"squadid" - number}
    - statusCode: 200
    - response: {
       - "message": "Squads recebido!",
       - "data": [
                {
                   "id": number,
                   "name": string,
                   "estimatedHours": number,
                   "squadId": number
                }
              ]
    }
```

```yml
GET /api/squad/:squadId?startDate=X&endDate=Y
    - Rota que retorna todos os dados daquela squad
    - headers: {}
    - body: {}
    - query: {
        "squadid" - number,
        "startDate"- string formato YYYY-MM-DD,
        "endDate"- string formato YYYY-MM-DD
        }
    - statusCode: 200
    - response: {
       - "message": "Squads recebido!",
       - "data": {
              "totalSquadHours": number,
              "averageSquadHoursPerDay": number,
              "members": [
                  {
                      "id": number,
                      "name": string,
                      "estimatedHours": number,
                      "totalWorkHours": number,
                      "averageWorkHoursPerDay": number,
                      "squadId": number,
                      "reports": [
                              {
                                "id": number,
                                "description": string,
                                "spentHours": number,
                                "employeeId": number,
                                "createdAt": string
                              }
                           ]
                        }
                    ]
                 }
              }
```

```yml
POST /api/employee
    - Rota que cria um funcionário/usuário
    - headers: {}
    - body: {
         "name": string,
         "estimatedHours": number,
         "squadId": number
    }
    - statusCode: 201
    - response: {
       - "message": "Employees criado",
       - "data": [
                {
                   "id": number,
                   "name": string,
                   "estimatedHours": number,
                   "squadId": number
                }
              ]
    }
```

```yml
POST /api/squad
    - Rota que cria uma squad
    - headers: {}
    - body: {
         "name": string,
    }
    - statusCode: 201
    - response: {
       - "message": "Squad criado",
       - "data": [
                {
                   "id": number,
                   "name": string,
                }
              ]
    }
```

```yml
POST /api/report
    - Rota que cria um relatório de trabalho/report
    - headers: {}
    - body: {
         "description": string,
         "spentHours": number,
         "employeeId": number,
    }
    - statusCode: 201
    - response: {
       - "message": "Report criado",
       - "data": [
                {
                   "id": number,
                   "description": string,
                   "spentHours": number,
                   "employeeId": number,
                   "createdAt": string
                }
              ]
    }
```



