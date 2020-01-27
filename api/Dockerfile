FROM node:10

WORKDIR /api

COPY --chown=node:node . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["/api/docker-entrypoint.sh"]

CMD [ "npm", "start" ]
