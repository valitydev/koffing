# Koffing 
[![Build Status](http://ci.rbkmoney.com/buildStatus/icon?job=rbkmoney_private/koffing/master)](http://ci.rbkmoney.com/job/rbkmoney_private/view/Frontend/job/koffing/job/master/)

Личный кабинет мерчанта

## Настройка
Конфигурация приложения происходит в файле [appConfig.json](/app/appConfig.json)

Конфигурация keycloak клиента koffing происходит в файле [koffingKeycloakConfig.json](/app/koffingKeycloakConfig.json)

Конфигурация keycloak клиента tokenizer происходит в файле [tokenizationKeycloakConfig.json](/tokenization/tokenizationKeycloakConfig.json)

Для изменения конфигурации в рантайме достаточно заменить нужный json файл

Например в случае с nginx, json файлы нужно положить в `/usr/share/nginx/html`

## Установка и запуск
Для загрузки зависимостей выполнить: ```npm i ```

Далее будут доступны следующие опции:

```npm start``` - запуск приложения на локальном сервере. По умолчанию будет доступен на порту ```8000```. Порт задается в [package.json](/package.json)

```npm build``` - сборка prod версии статики. 

