# Koffing 
[![Build Status](http://ci.rbkmoney.com/buildStatus/icon?job=rbkmoney_private/koffing/master)](http://ci.rbkmoney.com/job/rbkmoney_private/view/Frontend/job/koffing/job/master/)

Личный кабинет мерчанта

## Настройка
Конфигурация приложения происходит в файле [appConfig.json](/app/appConfig.json)

Конфигурация keycloak клиента koffing происходит в файле [koffingKeycloakConfig.json](/app/koffingKeycloakConfig.json)

Конфигурация keycloak клиента tokenizer происходит в файле [tokenizationKeycloakConfig.json](/tokenization/tokenizationKeycloakConfig.json)

Для изменения конфигурации в рантайме достаточно заменить нужный json файл

Например в случае с nginx, json файлы нужно положить в `/usr/share/nginx/html`

## Установка

    npm install
    npm run build

## Интеграция с Keycloak
Настройка происходит с помощью файла [keycloak.json](/app/keycloak.json)
