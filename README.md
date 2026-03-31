# Bonini Finances

Aplicação web para gerenciamento de finanças pessoais, desenvolvida com React. Permite controlar transações, organizar categorias, definir orçamentos e acompanhar metas financeiras.

---

## Descrição

O Bonini Finances possibilita ao usuário acompanhar sua vida financeira de forma clara e estruturada. A aplicação oferece uma visão geral com indicadores, gráficos, controle por categorias e acompanhamento de metas, além de filtro por período.

---

## Teste agora

- Conta de teste:
- Email: teste@gmail.com  
- Senha: 123456

link projeto https://projeto-gestao-financeira-pz6d.vercel.app/

---


## Preview

[![Screenshot-20.png](https://i.postimg.cc/brFJvc9P/Screenshot-20.png)](https://postimg.cc/9wZVxkkg)
[![Screenshot-21.png](https://i.postimg.cc/kGDJzY3h/Screenshot-21.png)](https://postimg.cc/fSnQ0Kbx)
[![Screenshot-22.png](https://i.postimg.cc/WzKNvms1/Screenshot-22.png)](https://postimg.cc/Mf720QcC)
[![Screenshot-23.png](https://i.postimg.cc/5NY9mrm4/Screenshot-23.png)](https://postimg.cc/LnSM9N7w)
[![Screenshot-24.png](https://i.postimg.cc/pXwWcB0B/Screenshot-24.png)](https://postimg.cc/ykTCk0CJ)


---

## Funcionalidades

**Autenticação**

* Cadastro e login de usuários
* Autenticação via token JWT com expiração
* Proteção de rotas privadas

**Dashboard**

* Exibição do saldo atual
* Indicador de economia mensal
* Gráfico de gastos por categoria (formato donut)
* Listagem das últimas transações

**Categorias**

* Criação, listagem e exclusão de categorias
* Controle de orçamento por categoria
* Barra de progresso (gasto vs orçamento)

**Metas**

* Criação de metas financeiras
* Adição e remoção de valores
* Acompanhamento de progresso
* Indicador de conclusão

**Transações**

* Registro de entradas e saídas
* Associação com categorias
* Campo de descrição opcional

**Filtro por mês**

* Visualização de dados históricos

**Interface**

* Layout responsivo (mobile e desktop)
* Feedback visual com skeletons, modais e mensagens de erro

---

## Tecnologias Utilizadas

* React 18
* React Router DOM
* Context API
* Chart.js
* TailwindCSS
* Vite
* FontAwesome
* React Hook Form

---

## Como executar o projeto

### Pré-requisitos

* Node.js 18 ou superior
* npm ou yarn
* Backend da aplicação em execução

### Passos

Clone o repositório:

```bash
git clone https://github.com/otaviobonini/projetoGestaoFinanceira.git
cd projetoGestaoFinanceira
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz:

```env
VITE_API_URL=http://localhost:3333
```

Inicie o projeto:

```bash
npm run dev
```

Acesse no navegador:

```
http://localhost:5173
```

---

## Integração com API

A aplicação consome uma API REST. Todos os endpoints (exceto autenticação) requerem token Bearer no header Authorization.

| Método | Rota                    | Descrição         |
| ------ | ----------------------- | ----------------- |
| POST   | /auth/register          | Registrar usuário |
| POST   | /auth/login             | Autenticação      |
| GET    | /transactions           | Listar transações |
| POST   | /transactions           | Criar transação   |
| DELETE | /transactions/:id       | Remover transação |
| GET    | /categories             | Listar categorias |
| POST   | /categories             | Criar categoria   |
| DELETE | /categories/:id         | Remover categoria |
| GET    | /metas                  | Listar metas      |
| POST   | /metas                  | Criar meta        |
| DELETE | /metas/:id              | Remover meta      |
| PATCH  | /metas/add-value/:id    | Adicionar valor   |
| PATCH  | /metas/remove-value/:id | Remover valor     |


Projeto desenvolvido para fins de estudo e portfólio.
