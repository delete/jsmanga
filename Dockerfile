from node:argon

RUN mkdir -p /install

WORKDIR /install

COPY package.json /install/

ENV NODE_PATH=/install

RUN npm install

ENV NODE_PATH=/install/node_modules 

WORKDIR /app/

COPY . /app/    
