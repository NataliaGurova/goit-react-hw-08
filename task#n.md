 Кожне завдання буде представлено об'єктом з наступними властивостями:

id - унікальний ідентифікатор
text - текст, який ввів користувач під час створення
completed - прапор, що вказує, виконано завдання чи ні

// Початкове значення стану Redux для кореневого редюсера,
// якщо не передати параметр preloadedState.
const initialState = {
  tasks: [
    { id: 0, text: "Learn HTML and CSS", completed: true },
    { id: 1, text: "Get good at JavaScript", completed: true },
    { id: 2, text: "Master React", completed: false },
    { id: 3, text: "Discover Redux", completed: false },
    { id: 4, text: "Build amazing apps", completed: false },
  ],
  filters: {
    status: "all",
  },
};

Для того, щоб відокремити логіку Redux від коду компонентів, нам буде достатньо зробити папку src/redux з такими файлами.
actions.js - файл оголошення екшенів програми
reducer.js - файл оголошення функцій-редюсерів для оновлення стану
constants.js - файл для зберігання констант (наприклад значень фільтру статусу)
selectors.js - файл оголошення функцій-селекторів
store.js - файл створення стор Redux
============================================

 npm install redux
 Для використання React та Redux разом, необхідно додати до проекту бібліотеку React Redux
 npm install react-redux


Для створення стора є функція configureStore(), яка приймає кілька параметрів та повертає новий об'єкт стора.

configureStore(reducer, preloadedState, enhancer)
reducer - функція із логікою зміни стану Redux. Обов'язковий параметр.
preloadedState - початковий стан програми. Це має бути об'єкт тієї ж форми, що й, як мінімум, частина стану. Необов'язковий параметр.
enhancer - функція розширення можливостей стору. Необов'язковий параметр.

// src/redux/store.js

import { configureStore } from "redux"; !!!!!! configur

// Початкове значення стану Redux для кореневого редюсера,
// якщо не передати параметр preloadedState.
const initialState = {
  tasks: [
    { id: 0, text: "Learn HTML and CSS", completed: true },
    { id: 1, text: "Get good at JavaScript", completed: true },
    { id: 2, text: "Master React", completed: false },
    { id: 3, text: "Discover Redux", completed: false },
    { id: 4, text: "Build amazing apps", completed: false },
  ],
  filters: {
    status: "all",
  },
};

// Поки що використовуємо редюсер який
// тільки повертає отриманий стан
const rootReducer = (state = initialState, action) => {
  return state;
};

export const store = configureStore(rootReducer);

====================================================

 Щоб зв'язати store з компонентами React, щоб вони могли отримувати доступ до стору та його методів у бібліотеці React Redux є компонент Provider, котрий чекає однойменний пропс store.  Для того щоб будь-який компонент у додатку міг використовувати стор, обертаємо Provider все дерево компонентів.

 // src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
	  <Provider store={store}>
	    <App />
	  </Provider>
  </React.StrictMode>
);


==================================

Для початку необхідно додати розширення інструментів розробника у ваш браузер:

Chrome Web Store
Firefox Add-ons
Edge Add-ons


Далі встановлюємо бібліотеку, яка дозволить ініціалізувати логіку Redux DevTools та зв'язати її з розширенням в інструментах розробника.

npm install @redux-devtools/extension

Ми поки що не використовуємо жодних додаткових можливостей Redux, тому імпортуємо функцію devToolsEnhancer і використовуємо її при створенні стора, передавши її результат третім аргументом, замість початкового стану.
-----------------------------------
// src/redux/store.js

<!-- import { createStore } from "redux"; не актуальне!!!!!!! -->
Актуальне
import { configureStore } from "@reduxjs/toolkit";
import { devToolsEnhancer } from "@redux-devtools/extension";

const initialState = {
  tasks: [
    { id: 0, text: "Learn HTML and CSS", completed: true },
    { id: 1, text: "Get good at JavaScript", completed: true },
    { id: 2, text: "Master React", completed: false },
    { id: 3, text: "Discover Redux", completed: false },
    { id: 4, text: "Build amazing apps", completed: false },
  ],
  filters: {
    status: "all",
  },
};

const rootReducer = (state = initialState, action) => {
  return state;
};

// Створюємо розширення стора, щоб додати інструменти розробника
const enhancer = devToolsEnhancer();
export const store = configureStore(rootReducer, enhancer);
--------------------------------------------
npm i
npm run dev
--------------------------------------------
items = contacts !!!!!!!!!!!!!!!! 