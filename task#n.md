STORE====

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contactsSlice";
import { filtersReducer } from "./filtersSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filters: filtersReducer,
});

const persistConfig = {
  key: 'book', // Ключ кореневого об'єкта, в якому будуть зберігатися дані
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

=================================================
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { tasksReducer } from './tasks/slice';
import { authReducer } from './auth/slice';

// Persisting token field from auth slice to localstorage
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
===================================================
APP

import { useDispatch, useSelector } from 'react-redux';

import { useEffect, lazy } from 'react';

import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { refreshUser } from '../redux/auth/operations';
import { selectIsRefreshing } from '../redux/auth/selectors';

import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const TasksPage = lazy(() => import('../pages/TasksPage/TasksPage'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/tasks" component={<RegisterPage />} />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/tasks" component={<LoginPage />} />
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute redirectTo="/login" component={<TasksPage />} />
          }
        />
      </Routes>
    </Layout>
  );
};
============================================
MAIN

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import 'modern-normalize';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

====================================
HomePage===

import DocumentTitle from '../../components/DocumentTitle';

const styles = {
  container: {
    minHeight: 'calc(100vh - 50px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 500,
    fontSize: 48,
    textAlign: 'center',
  },
};

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>

      <div style={styles.container}>
        <h1 style={styles.title}>
          Task manager welcome page{' '}
          <span role="img" aria-label="Greeting icon">
            💁‍♀️
          </span>
        </h1>
      </div>
    </>
  );
}

==========================================
LoginPage===

import DocumentTitle from '../../components/DocumentTitle';
import { LoginForm } from '../../components/LoginForm/LoginForm';

export default function LoginPage() {
  return (
    <div>
      <DocumentTitle>Login</DocumentTitle>
      <LoginForm />
    </div>
  );
}

========================================================
RegisterPage===

import DocumentTitle from '../../components/DocumentTitle';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

export default function RegisterPage() {
  return (
    <div>
      <DocumentTitle>Registration</DocumentTitle>
      <RegisterForm />
    </div>
  );
}

=========================================================
TasksPage===

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentTitle from '../../components/DocumentTitle';
import { TaskList } from '../../components/TaskList/TaskList';
import { TaskEditor } from '../../components/TaskEditor/TaskEditor';
import { fetchTasks } from '../../redux/tasks/operations';

import { selectLoading } from '../../redux/tasks/selectors';

export default function TasksPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <DocumentTitle>Your tasks</DocumentTitle>
      <TaskEditor />
      <div>{isLoading && 'Request in progress...'}</div>
      <TaskList />
    </>
  );
}

=====

// import css from './App.module.css'
// import ContactForm from "./components/ContactForm/ContactForm"
// import SearchBox from "./components/SearchBox/SearchBox"
// import ContactList from "./components/ContactList/ContactList"
// import { fetchContacts } from './redux/contacts/operations';
// import { selectContacts, selectError, selectIsLoading } from './redux/contacts/selectors';


// import { RegistrationForm } from './components/RegistrationForm/RegistrationForm';
// import { LoginForm } from './components/LoginForm/LoginForm';


// function App() {
//   const dispatch = useDispatch();
//   // const { items, isLoading, error } = useSelector(selectContacts);
//   const items = useSelector(selectContacts)
//   const isLoading = useSelector(selectIsLoading)
//   const error = useSelector(selectError)
  
//   useEffect(() => {
//     dispatch(fetchContacts());
//   }, [dispatch]);
  
//   return (
//     <div className={css.section}>
//       <div className={css.container}>
        
//         <RegistrationForm />
//         <LoginForm />

//       <h1>Phonebook</h1>
//       <ContactForm />
//       <SearchBox />
//       {isLoading && <b>Loading tasks...</b>}
//       {error && <b>{error}</b>}
//       {items.length > 0 && <ContactList items={items} />}
//       </div>
//     </div>
//   )
// }