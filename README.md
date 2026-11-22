# Cifra de César - Com adicional de Decifra por Força Bruta

Integrantes: João Victor Yudi Mizuno

Matéria: Segurança da Informação

Orientador: Daniel Cintra Cugler

IFSP Campus Boituva

## Descrição do Projeto

Este projeto é um trabalho realizado para a matéria de Segurança da Informação, que foi requisitada uma API RESTfull que pudesse criptografar e decriptografar mensagem por meio da Cifra de Cesar, com uma funcionalidade especial capaz de decifrar por meio de força bruta.
A força bruta é aplicada por meio da comparação das 25 possibilidades de mensagens cifradas pela cifra de cesar, onde cada palavra de cada possibilidade é comparada com as presentes na lingua portuguesa (com o auxilio de uma bilbioteca externa, citada abaixo, usando o PYTHONPROBR) 

## Tecnologias

- Linguagem: TypeScript
- BackEnd: Node.js + Express
- Hospedagem da API: Render - Disponível no link: [https://si-cifra-cesar-bruteforce.onrender.com/](https://si-cifra-cesar-bruteforce.onrender.com/)
- Documentação das Rotas: Swagger - Disponível no link: [https://si-cifra-cesar-bruteforce.onrender.com/api-docs](https://si-cifra-cesar-bruteforce.onrender.com/api-docs)
- Biblioteca de Dicionario Portugues Brasileiro: [@andsfonseca/palavras-pt-br](https://www.npmjs.com/package/@andsfonseca/palavras-pt-br): dicionário usado para identificar texto em português

## Como funciona

**Cifra de César:** cada letra é deslocada N posições no alfabeto (26 letras). Maiúsculas e minúsculas são preservadas, e espaços não são alterados.

```
Não é permitido inserir números, acentos ou caracteres especiais, se for enviado, a API retornara um erro
```

**Força bruta:** o texto cifrado é deslocado de 1 a 25 posições. Cada possibilidade de mensagem recebe uma pontuação igual ao número de palavras encontradas no dicionário de português brasileiro. A possibilidade com maior pontuação é retornado. Se nenhuma possibilidade tiver palavra válida, a API retorna erro.

```
Como esse método envolve comparar TODAS as possibilidades com o dicionário, isso acaba deixando o processo de decifrar por força bruta mais lento, principalmente se for utilizado a API remota
```


## Como utilizar

A API pode ser utilizada de forma:

- Remota - Pelo link do Render: [https://si-cifra-cesar-bruteforce.onrender.com/](https://si-cifra-cesar-bruteforce.onrender.com/)
- Local, sendo necessário baixar o repositório e realizar o passo a passo abaixo

1. Garantir que o node.js esteja instalado:

```
    node -v
```

- Se ele não estiver instalado, ele pode ser instalado neste link: [https://nodejs.org/pt-br](https://nodejs.org/pt-br)

2. Baixar as depedências do projeto:

```
    npm install
```

3. Rodar a API no terminal, na raiz do projeto

```
    npm start
```

Após isso, a API estará rodando na porta 80, o localhost, o próprio terminal fornecerá o link da API: [http:localhost:80](http:localhost:80)

---

## Endpoints

### `POST /cifrar`

Cifra um texto com o deslocamento informado.

**Request**
```json
{
  "textoClaro": "ola mundo",
  "deslocamento": 3
}
```

**Response `200`**
```json
{
  "textoCifrado": "rod pxqgr"
}
```

### `POST /decifrar`

Decifra um texto conhecendo o deslocamento.

**Request**
```json
{
  "textoCifrado": "rod pxqgr",
  "deslocamento": 3
}
```

**Response `200`**
```json
{
  "textoClaro": "ola mundo"
}
```

### `POST /decifrarForcaBruta`

Decifra um texto sem conhecer o deslocamento, usando força bruta e o dicionário de português.

**Request**
```json
{
  "textoCifrado": "rod pxqgr"
}
```

**Response `200`**
```json
{
  "textoClaro": "ola mundo"
}
```

### Erros

Em caso de entrada inválida, todos os endpoints retornam `400`:

```json
{
  "erro": "Entrada invalida: Texto claro esta vazio"
}
```

## Regras e validações

- O texto deve conter **apenas letras sem acento (A-Z, a-z) e espaços**. Números, pontuação e caracteres acentuados são rejeitados.
- O texto não pode ser vazio.
- O deslocamento é obrigatório e deve ser maior que zero (o valor 0 é rejeitado).
- Deslocamentos maiores que 26 são aceitos, pois o alfabeto é tratado de forma circular.
- Na força bruta, se nenhum deslocamento gerar palavras válidas em português, é retornado o erro `Nao foi possivel encontrar nenhuma mensagem clara em Portugues Brasileiro`.