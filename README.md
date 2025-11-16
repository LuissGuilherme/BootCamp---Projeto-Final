## API de Países 🌎
Este é um PWA (Progressive Web App) simples que consome a restcountries.com API para permitir aos usuários buscar informações sobre países.

✨ Funcionalidades
Busca por Nome: Encontra um país pelo seu nome.

Busca por Capital: Encontra um país pelo nome de sua capital.

Exibição de Detalhes: Mostra informações específicas como:

Nome Oficial

Continente

População

Capital

## Utilizando o Docker

Para executar o projeto completo (PWA + API) localmente, você vai precisar ter o **Docker** e o **Docker Compose** instalados.

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git](https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git)
    ```

2.  Entre na pasta do projeto:
    ```bash
    cd NOME-DO-REPOSITORIO
    ```

3.  Suba os contêineres (necessário para carregar as imagens e serviços):
    ```bash
    docker-compose up --build
    ```

4.  Pronto!
    * Acesse a **PWA (web)** em: `http://localhost:8080`
    * A **API (api)** rodará em: `http://localhost:3000`

