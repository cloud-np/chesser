FROM node:latest
# RUN mkdir -p /app/public /app/src
WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 4200
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
