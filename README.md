# Приложение Movie App

## Обзор
Это приложение предоставляет подробную информацию о фильмах, включая трейлер, динамически загружаемый с YouTube. Оно создано с помощью React, MobX и Material-UI и использует YouTube Data API v3 для загрузки сведений о видео.

## Функции
- Извлечение и отображение подробной информации о фильмах.
- Воспроизведение трейлеров фильмов с помощью встроенного в YouTube iframe.
- Сохранение и восстановление позиции воспроизведения с помощью `localStorage`.

---

## Используемые технологии

### Фронтенд:
- **React**: для создания компонентов пользовательского интерфейса.
- **MobX**: для управления состоянием.
- **Material-UI**: для предварительно разработанных компонентов и стилей.

### API и библиотеки:
- **YouTube Data API v3**: для загрузки информации о видео.
- **Axios**: для выполнения HTTP-запросов.

### Утилита:
- **localStorage**: Для сохранения состояния воспроизведения.

---

## Предварительные условия

### Необходимые инструменты:
- Node.js (v16 или более поздней версии)
- npm или yarn

### Ключ API:
- Получите действительный ключ API для YouTube Data API v3:

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/).
2. Создайте проект или выберите существующий.
3. Включите «YouTube Data API v3» в библиотеке API.
4. Сгенерируйте ключ API и запишите его для дальнейшего использования.

## Введите минимум 2 символа что бы не было ошибки типо:
```js
{
    "Response": "False",
    "Error": "Too many results."
}
```

---

## Установка

### 1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd movie-details-app
```

### 2. Установите зависимости:
```bash
npm install
# или
yarn install
```

### 3. Настройте приложение:
Создайте файл `.env` в корневом каталоге со следующим содержимым:
```env
REACT_APP_YOUTUBE_API_KEY=your_api_key_here
```
Замените `your_api_key_here` на ваш фактический ключ API.

P.S. я пока что добавил один ключ YOUTUBE_API_KEY

### 4. Запустите приложение:
```bash
npm run dev
# или
yarn dev
```

Приложение будет доступно по адресу `http://localhost:3000/`.

---

## Структура папок
```
src/
|-- components/
| |-- MovieDetails.tsx // Отображает сведения о фильме и трейлер
| |-- VideoPlayer.tsx // Воспроизводит видео YouTube
| |-- MovieInfo.tsx // Отображает текстовые сведения о фильме
|
|-- hooks/
| |-- useDebounce.ts // Кастомный хук useDebaounce(для инпут поиска)
|
|-- stores/
| |-- DetailedMovieStore.ts // Управляет состоянием фильма с помощью MobX
| |-- FavoriteMovieStore.ts // Управляет состоянием избранных фильмов с помощью MobX
| |-- MovieStore.ts // Управляет состоянием всех фильмов с помощью MobX
|
|-- UI/
| |-- FavoriteMovieButton.tsx
| |-- NextArrow.tsx // стрелка на право для слайдера
| |-- PrevArrow.tsx // стрелка на лево для слайдера
|
|-- utils/
| |-- localStorage.ts // Утилиты для управления localStorage
|
|-- App.tsx // Основной компонент приложения
|-- main.tsx // Точка входа
```

---

## Использование

1. Перейдите на страницу сведений о фильме в приложении.
2. Приложение получит трейлер фильма с помощью API данных YouTube.
3. Запустите трейлер, и ваш прогресс воспроизведения будет сохранен.
4. При возврате к трейлеру воспроизведение возобновится с того места, на котором вы остановились.

---

## Обработка ошибок
### Распространенные проблемы и способы их устранения:

#### 1. **Ошибка 403 Forbidden от YouTube API**
- Убедитесь, что ключ API действителен и имеет доступ к YouTube Data API v3.
- Проверьте, не превысили ли вы квоту API.
- Убедитесь, что ключ API не ограничен неверными доменами или IP-адресами.

#### 2. **Видео не найдено**
- Убедитесь, что запрос фильма соответствует действительному контенту YouTube.
- Используйте ведение журнала для отладки любых проблем с ответом API.

#### 3. **Время воспроизведения не сохранено**
- Убедитесь, что `localStorage` включен в браузере.
- Проверьте наличие ошибок в методах утилиты `localStorage`.

---

## Развертывание

### Сборка для производства:
```bash
npm run build
# или
yarn build
```
---