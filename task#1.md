Книга контактів

Бекенд



Створи свій персональний бекенд для розробки за допомогою UI-сервісу mockapi.io. Зареєструйся використовуючи свій обліковий запис GitHub та обери безкоштовний план.



Переглянь демо-відео, як створити бекенд-застосунок та конструктор ресурсу, щоб отримати ендпоінт /contacts.

Форма стану



Додай у стан Redux обробку індикатора завантаження та помилки HTTP-запитів. Для цього зміни форму стану слайсу контактів, додавши властивості loading та error.



{
  contacts: {
    items: [],
    loading: false,
    error: null
  },
  filters: {
		name: ""
	}
}



Операції



В папці redux створи файл contactsOps.js для зберігання асинхронних генераторів екшенів.



Використовуй функцію createAsyncThunk для оголошення операцій.
Для виконання HTTP-запитів використай бібліотеку axios.


Оголоси наступні операції:

fetchContacts - одержання масиву контактів (метод GET) запитом. Базовий тип екшену це рядок "contacts/fetchAll".
addContact - додавання нового контакту (метод POST). Базовий тип екшену це рядок "contacts/addContact".
deleteContact - видалення контакту по ID (метод DELETE). Базовий тип екшену це рядок "contacts/deleteContact".


Для коректного опрацювання помилки HTTP-запиту в середині операцій, використай конструкцію try...catch, та у блоці catch поверни результат виклику методу thunkAPI.rejectWithValue.



Обробку усіх трьох екшенів (fulfilled, rejected, pending) та зміну даних у стані Redux зроби у властивості extraReducers слайсу контактів, а от властивість reducers з нього — прибери.



Мемоізація селекторів



Після додавання властивостей loading та error у слайс контактів, виникне проблема оптимізаціі фільтрування контактів, так як вираз фільтрування буде виконуватись не тільки при зміні контактів або фільтру, а також при зміні loading та error.



Для вирішення цієї задачі:

У файлі слайсу контактів contactsSlice.js створи та експортуй мемоізований селектор selectFilteredContacts за допомогою функції createSelector.
Селектор повинен залежати від поточних масиву контактів і значення фільтра, та повертати відфільтрований масив контактів.
Селектор selectFilteredContacts імпортується у компонент списка контактів ContactList.jsx та використовується у useSelector.


Колекція контактів



Оскільки твоя колекція контактів тепер зберігається на бекенді, то:



При завантаженні додатка запит на бекенд для отримання масиву контактів зроби саме в компоненті Арр.
При створенні нового контакту додавати йому унікальний ідентифікатор більше не потрібно, це буде робити сам бекенд і повертати у відповідь об’єкт нового контакту.
===============================================
ContactsSLICE.js

import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "./operations";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;


---------------------------------
APP
 const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(getTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

----------------------------------
=========================================
Додавання контактів

.addCase(addTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

------------------------------------------
// src/components/TaskForm/TaskForm.jsx

import { useDispatch } from "react-redux";
import { addTask } from "redux/operations";

export const TaskForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    dispatch(addTask(event.target.elements.text.value));
    form.reset();
  };

  // Решта коду компонента
};

------------------------------------------
// src/redux/operations.js

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (text, thunkAPI) => {
    try {
      const response = await axios.post("/tasks", { text });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
---------------------------------
==========================================
// src/redux/selectors.js


export const getTasks = state => state.tasks.items;


export const getIsLoading = state => state.tasks.isLoading;


export const getError = state => state.tasks.error;


export const getStatusFilter = state => state.filters.status;

==========================================
Видалення завдання

.addCase(deleteTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

----------------------------
// src/redux/operations.js

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
--------------------------------
// src/components/Task/Task.jsx

import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { deleteTask } from "redux/operations";

export const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteTask(task.id));

  return (
    <div>
      <input type="checkbox" checked={task.completed} />
      <p>{task.text}</p>
      <button onClick={handleDelete}>
        <MdClose size={24} />
      </button>
    </div>
  );
};


============================
state.items.filter((contact) => contact.id !== action.payload);

==========================

export const selectFilteredContacts = createSelector(
   // Масив вхідних селекторів
  [inputSelector1, inputSelector2, inputSelector3],
  // Функція перетворювач
  (result1, result2, result3) => {
    // Виконуємо обчислення та повертаємо результат
  }
)
-----------------------
import { createSelector } from '@reduxjs/toolkit';
import { statusFilters } from './constants';

export const selectTasks = (state) => state.tasks.items;

export const selectIsLoading = (state) => state.tasks.isLoading;

export const selectError = (state) => state.tasks.error;

export const selectStatusFilter = (state) => state.filters.status;

export const selectVisibleTasks = createSelector(
  [selectTasks, selectStatusFilter],
  (tasks, statusFilter) => {
    console.log('Calculating visible tasks');

    switch (statusFilter) {
      case statusFilters.active:
        return tasks.filter((task) => !task.completed);
      case statusFilters.completed:
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }
);

export const selectTaskCount = createSelector([selectTasks], (tasks) => {
  console.log('Calculating task count');

  return tasks.reduce(
    (count, task) => {
      if (task.completed) {
        count.completed += 1;
      } else {
        count.active += 1;
      }
      return count;
    },
    { active: 0, completed: 0 }
  );
});
