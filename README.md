# Tasks

- **Implementar bastantes testes**
- Utilizar o padrão DDD
- Utilizar autenticação
- Utilizar validação com a biblioteca ZOD

## Introdução

### Sobre o desafio

Nesse desafio desenvolveremos uma API para controle de encomendas de uma transportadora fictícia, a FastFeet.

#### Tecnologias (Até o momento)

- [NestJs](https://nestjs.com/)
- [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/) para upload de arquivos
- [Prisma](https://www.prisma.io/) como _ORM_
- [JWT](https://jwt.io/) para authenticação e autorização
- [Zod](https://zod.dev/) para a validação da informação

#### Regras da aplicação

- [ ] A aplicação deve ter dois tipos de usuário, entregador e/ou admin
- [ ] Deve ser possível realizar login com CPF e Senha
- [ ] Deve ser possível realizar o CRUD dos entregadores
- [ ] Deve ser possível realizar o CRUD das encomendas
- [ ] Deve ser possível realizar o CRUD dos destinatários
- [ ] Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada)
- [ ] Deve ser possível retirar uma encomenda
- [ ] Deve ser possível marcar uma encomenda como entregue
- [ ] Deve ser possível marcar uma encomenda como devolvida
- [ ] Deve ser possível listar as encomendas com endereços de entrega próximo ao local do entregador
- [ ] Deve ser possível alterar a senha de um usuário
- [ ] Deve ser possível listar as entregas de um usuário
- [ ] Deve ser possível notificar o destinatário a cada alteração no status da encomenda

#### Regras de negócio

- [ ] Somente usuário do tipo admin pode realizar operações de CRUD nas encomendas
- [ ] Somente usuário do tipo admin pode realizar operações de CRUD dos entregadores
- [ ] Somente usuário do tipo admin pode realizar operações de CRUD dos destinatários
- [ ] Para marcar uma encomenda como entregue é obrigatório o envio de uma foto
- [ ] Somente o entregador que retirou a encomenda pode marcar ela como entregue
- [ ] Somente o admin pode alterar a senha de um usuário
- [ ] Não deve ser possível um entregador listar as encomendas de outro entregador

#### Conceitos que pode praticar

- DDD, Domain Events, Clean Architecture
- Autenticação e Autorização (RBAC)
- Testes unitários e e2e
- Integração com serviços externos

#### Contexto da aplicação

É comum ao estar desenvolvendo uma API, imaginar como esses dados vão estar sendo utilizados pelo cliente web e/ou mobile.

Por isso, deixamos abaixo o link para o layout da aplicação que utilizaria essa API.

[FastFeet](https://www.figma.com/file/hn0qGhnSHDVst7oaY3PF72/FastFeet?type=design&node-id=0:1&mode=design&t=eLVBsXQU7wYugimZ-1)

## Entrega

Após concluir o desafio, você deve enviar a URL do seu código no GitHub para a plataforma.

Além disso, que tal fazer um post no LinkedIn compartilhando o seu aprendizado e contando como foi a experiência?

É uma excelente forma de demonstrar seus conhecimentos e atrair novas oportunidades!

Feito com 💜 por Rocketseat 👋
