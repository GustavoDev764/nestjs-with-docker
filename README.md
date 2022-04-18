## Codigo Criado por Gustavo José

# Como instalar e usar o projeto (instruções)
é necessario ter o [docker](https://www.docker.com/products/docker-desktop) instalador na maquina
<p>clone repositório</p>

```sh
git clone https://github.com/GustavoDev764/nestjs-with-docker.git
```
entrar na pasta nestjs-with-docker
```sh
cd nestjs-with-docker
```

iniciar a aplicação
```sh
docker-compose up
```

Acessar o projeto
[http://localhost:3000](http://localhost:3000)

# Detalhes da aplicação
Esta é uma aplicação [Node](https://nodejs.org/en/) simples para avaliar o conhecimento do candidato para uma vaga de desenvolvedor backend para [Trademaster Servicos e Participações S.A.](https://www.trademaster.com.br/) 

## TODO
[PR](https://docs.github.com/pt/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests) é a melhor maneira de propor alterações na base de código (usamos o [Github Flow](https://guides.github.com/introduction/flow/index.html)). Acolhemos e analisamos ativamente suas requisições:

1. Faça o fork do repo e crie seu branch a partir do principal.
2. Se você adicionou um código que deve ser testado, adicione testes.
3. Se você mudou APIs, atualize a documentação.
4. Certifique-se de que o conjunto de testes seja aprovado.
5. A cobertúra mínima de testes deve ser 85%.
6. Certifique-se de que seu código seja executado.
7. Emita essa solicitação pull!

## Requisitos
Construir o conjunto de APIs abaixo. APIs estas que farão operações sobre uma tabela de banco de dados relacional (postgresql).
  
1. :heavy_check_mark: __GET__ _/api/login?user={user}&pwd={senha}_

_Response:_
```json
{
  "token": "JWT"
}
  
```

2. :heavy_check_mark: __POST__ _/api/user_
_Request:_
```json
{
  "user": "jsilva",
  "name": "João da Silva",
  "status": "ativo",
  "password": "123456"
}
  
```
_Response:_
```json
{
  "id": "1",
  "user": "jsilva",
  "name": "João da Silva",
  "status": "ativo",
  "password": "123456"
}
```

3. :heavy_check_mark: __PATCH__ _/api/user/{user_id}_
_Request:_
```json
{
  "name": "João Alves da Silva",
  "password": "123"
}
  
```
_Response:_
```json
{
  "id": "1",
  "user": "jsilva",
  "name": "João Alves da Silva",
  "status": "ativo",
  "password": "123"
}
```
### Bonus

1. :x: Para todas as APIs requeridas acima (exceto Login), deverá também haver uma forma de fazer a mesma operação via filas Rabbitmq.
2. :heavy_check_mark: Caso conheça [Typescript](https://www.typescriptlang.org/) este teste deve ser realizado nesta linguage.

## Requisitos de Aceite

1. :heavy_check_mark: O sistema deve rodar com um docker-compose através do comando abaixo, que iniciará o serviço web na porta __3000__.
```bash
$ docker-compose up
```
2. :heavy_check_mark: O docker compose em questão deve criara toda a infraestrura de software necessária para que aplicação funcione.
3. :heavy_check_mark: Este readme deve ser sobrescrito, adicionando aqui a documentação para a utilização do sistema.
