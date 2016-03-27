# jsmanga
Cópia descarada e mal feita em Javascript do [Pymanga](https://github.com/mazulo/pymanga), feito só para aprendizado e diversão. :]



## Como usar?

Pra instalar todas as dependências:

`npm install`


Para baixar o capítulo 800:

`node index.js  --manga "One Peace" --chapter 800`

> Apenas "One Peace" está habilitado por enquanto.

# Desenvolvedor

Para rodar usando Docker, primeiro crie uma imagem do Dockerfile:

`docker build -t node-app .`

Agora execute:

`docker run -it -v $(pwd):/app node-app node /app/index.js --manga "One Peace "--chapter 800`
