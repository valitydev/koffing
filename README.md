# Koffing
Личный кабинет мерчанта

## Установка

    npm install
    gulp build

## Интеграция с Keycloak
Настройка происходит с помощью файла [keycloak.json](/app/keycloak.json)

## Пример Docker развертки
    
    docker run --rm --name koffing -it -p 80:80 dr.rbkmoney.com/rbkmoney/koffing:koffing_test
