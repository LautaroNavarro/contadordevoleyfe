FROM node:alpine as builder

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

FROM nginx

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

COPY ./nginx/run.sh ./

CMD /bin/bash ./run.sh
