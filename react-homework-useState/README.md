# Структура проекта

```
src/
│
├── components/
│   ├── Counter.jsx
│   ├── ThemeSwitcher.jsx
│   ├── LoginForm.jsx
│   ├── ShoppingList.jsx
│   ├── TodoForm.jsx
│   ├── TodoItem.jsx
│   ├── TodoList.jsx
│   └── Filters.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

# Исходный код

| Компонент | Ссылка | Назначение |
|-----------|--------|------------|
| App | [`src/App.jsx`](./src/App.jsx) | Главный компонент приложения. Хранит состояние Todo List, поиск, фильтрацию, сортировку и массовые операции. |
| Main | [`src/main.jsx`](./src/main.jsx) | Точка входа React-приложения. |
| Стили | [`src/index.css`](./src/index.css) | Основные стили проекта. |
| Counter | [`src/components/Counter.jsx`](./src/components/Counter.jsx) | Счетчик с изменяемым шагом. |
| ThemeSwitcher | [`src/components/ThemeSwitcher.jsx`](./src/components/ThemeSwitcher.jsx) | Переключение между светлой и темной темой. |
| LoginForm | [`src/components/LoginForm.jsx`](./src/components/LoginForm.jsx) | Форма авторизации с проверкой заполнения полей. |
| ShoppingList | [`src/components/ShoppingList.jsx`](./src/components/ShoppingList.jsx) | Список покупок. |
| TodoForm | [`src/components/TodoForm.jsx`](./src/components/TodoForm.jsx) | Добавление новых задач. |
| TodoItem | [`src/components/TodoItem.jsx`](./src/components/TodoItem.jsx) | Отображение, редактирование и удаление задачи. |
| TodoList | [`src/components/TodoList.jsx`](./src/components/TodoList.jsx) | Вывод списка задач. |
| Filters | [`src/components/Filters.jsx`](./src/components/Filters.jsx) | Фильтрация задач по статусу и приоритету. |

# Выполненные задания

| № | Задание | Реализация |
|---|----------|------------|
| 1 | Счетчик с шагом | [`Counter.jsx`](./src/components/Counter.jsx) |
| 2 | Переключение темы | [`ThemeSwitcher.jsx`](./src/components/ThemeSwitcher.jsx) |
| 3 | Форма входа | [`LoginForm.jsx`](./src/components/LoginForm.jsx) |
| 4 | Список покупок | [`ShoppingList.jsx`](./src/components/ShoppingList.jsx) |
| 5 | Фильтрация по приоритету | [`Filters.jsx`](./src/components/Filters.jsx) |
| 6 | Сортировка задач | [`App.jsx`](./src/App.jsx) |
| 7 | Поиск задач | [`App.jsx`](./src/App.jsx) |
| 8 | Индикатор выполнения | [`App.jsx`](./src/App.jsx) |
| 9 | Проверка пустого названия | [`TodoItem.jsx`](./src/components/TodoItem.jsx) |
| 10 | Массовые операции | [`App.jsx`](./src/App.jsx) |

# Основные возможности

- Добавление новых задач.
- Редактирование существующих задач.
- Удаление задач.
- Отметка задач как выполненных.
- Поиск по названию.
- Сортировка задач.
- Фильтрация по статусу.
- Фильтрация по приоритету.
- Индикатор прогресса выполнения.
- Массовое управление задачами.
- Переключение темы оформления.
- Работа со списком покупок.
- Демонстрация работы с формами React.