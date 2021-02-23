FROM node:15.9.0-alpine as builder

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

COPY ./nginx/run.sh ./

CMD /bin/bash ./run.sh
