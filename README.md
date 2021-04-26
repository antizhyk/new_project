# Список продуктов
## Важно!
1. Прежде чем приступать к выполнению нижеописанной инструкции, у вас уже должны быть установлены:
   __Docker__ и __docker-compose__, __php-7.4 >__, __composer__, __node__.
2. Все команды выполнять в терминале Linux и желательно в оболочке bash. так как на других работа команд не
   проверялась.

## Инструкция по развертыванию приложения

1. Скачиваем и клонируем приложение в выбранную вами папку.
2. В данном проекте есть аналог __make__ файлов в которых можно записывать необходимые вам команды, это __sail__.
   Его миссия упростить работу с докером, до более приятных человеческому глазу команд. Но перед этим надо сделать
   вызов данной команды удобной. Открываем консоль в корне приложения и выполняем следующую команду:
   ```bash
   alias sail='bash vendor/bin/sail'
   ```
   Таким образом мы записали инструкцию выполнения этой команды в одно слово, с помощью которого мы управлять
   докером, более подробно ознакомится со всеми командами можно выполнив команду:
   ```bash
   sail -h
   ```

3. Прежде чем мы продолжим разворачивать приложение кратко пробегусь по файлу __.env__, у вас в данный момент есть
   его прототип, это __.env.example__. Данные файлы хранят в себе переменные в которых указаны адреса и порты контейнеров,
   логин и пароли от БД, настроить пользователя для докера, и другие настройки контейнеров. Помимо этих файлов хочу
   обратить на __docker-compose.yml__, в котором многие из вышеописанных настроек и применяются, а так же некоторые другие,
   к примеру установка сети на которую и "вешаются" контейнеры. После того как вы убедились что, установили все порты, пароли, хосты
   и т. д. Выполните команду:
   ```bash
   sail up -d
   ```
   и ждите окончания установки контейнеров.

4. После ставим пакеты <b>node</b> и <b>composer</b> (сами по себе эти ребята уже есть в контейнере), и так пишем:
   ```bash
   npm i && composer update
   ```

5. И заключительный этап, применение миграций с помощью команды:
    ```bash
    php artisan migrate 
    ```

