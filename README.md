# Koffing
Личный кабинет мерчанта

## Установка

    npm install
    gulp build

## Интеграция с Keycloak
Настройка происходит с помощью файла [keycloak.json](/app/keycloak.json)

## Пример Docker развертки
    
    docker build -t <your name>/koffing .
    docker run --rm --name koffing -it -p 8000:80 <your name>/koffing