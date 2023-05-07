# Криптовалютный сервис на React

Этот проект представляет собой небольшой сервис о криптовалюте, разработанный с использованием [CoinCap API](https://docs.coincap.io/) и написанный на React с использованием маршрутизации React Router.

## Описание
Сервис предоставляет информацию о топовых криптовалютах и подробные данные по отдельным валютам. Он использует CoinCap API для получения актуальных данных о криптовалютах, включая цены, рыночную капитализацию, объемы торгов и другую статистику.

Первый маршрут

<img width="700px" src="https://github.com/wybin4/cryptocurr/blob/main/public/cryptoTop.PNG"/>

Второй маршрут

<img width="600px" src="https://github.com/wybin4/cryptocurr/blob/main/public/bigScreen.png"/><img width="300px" src="https://github.com/wybin4/cryptocurr/blob/main/public/littleScreen1.PNG"/>

## Особенности
### Доступны два маршрута:

- / - отображает список топовых криптовалют с их основной информацией, такой как имя, цена, изменение за последние 24 часа и другие параметры.
- /currencies/{id} - отображает подробную информацию о выбранной валюте, включая исторические данные, графики и другую статистику.
### Визуализация данных:

Для отображения спарклайнов и графиков использована библиотека d3.js. Спарклайны позволяют быстро оценить изменение цены криптовалюты за определенный период времени.
Для повышения производительности и быстрого отображения спарклайнов, реализовано кэширование.
### Анимации:

Для создания небольших анимаций в интерфейсе использована библиотека framer-motion. Это помогает сделать пользовательский опыт более интерактивным и привлекательным.
## Требования
Для запуска проекта необходимо иметь установленные следующие компоненты:

- Node.js
- NPM (Node Package Manager)
## Установка
Склонируйте репозиторий с помощью следующей команды:

```
git clone https://github.com/wybin4/cryptocurr.git
```
Перейдите в директорию проекта:

```
cd cryptocurr
```
Установите зависимости:

```
npm install
```
## Запуск
После завершения установки можно запустить проект с помощью команды:

```
npm start
```
Откройте браузер и перейдите по адресу http://localhost:3000
