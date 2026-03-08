# Публикация на GitHub и kolesova.cv

## Шаг 1: Создайте репозиторий на GitHub

1. Перейдите на [github.com/new](https://github.com/new)
2. Название репозитория: `kolesova.cv` (или любое другое)
3. Выберите **Public**
4. **Не** добавляйте README, .gitignore или лицензию — проект уже готов
5. Нажмите **Create repository**

## Шаг 2: Загрузите код на GitHub

В терминале выполните (замените `YOUR_USERNAME` на ваш логин GitHub):

```bash
cd /Users/tanyajune/PF26

git remote add origin https://github.com/YOUR_USERNAME/kolesova.cv.git
git branch -M main
git push -u origin main
```

## Шаг 3: Включите GitHub Pages

1. Откройте репозиторий на GitHub
2. **Settings** → **Pages**
3. В разделе **Source** выберите **Deploy from a branch**
4. В **Branch** выберите `main` и папку `/ (root)`
5. Нажмите **Save**

Сайт будет доступен по адресу: `https://YOUR_USERNAME.github.io/kolesova.cv/`

## Шаг 4: Подключите домен kolesova.cv

1. В **Settings** → **Pages** найдите **Custom domain**
2. Введите: `kolesova.cv`
3. Нажмите **Save**

### Настройка DNS у регистратора домена

Добавьте записи в панели управления доменом:

| Тип | Имя | Значение |
|-----|-----|----------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR_USERNAME.github.io |

*(Замените YOUR_USERNAME на ваш логин GitHub)*

Подождите 5–30 минут для обновления DNS. После этого сайт будет доступен на **http://kolesova.cv**
