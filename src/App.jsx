
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, lazy } from 'react';

import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { refreshUser } from './redux/auth/operations';
import { selectIsRefreshing } from './redux/auth/selectors';

import { PrivateRoute } from './components/PrivateRoute';
import { RestrictedRoute } from './components/RestrictedRoute';


const HomePage = lazy(() => import('../src/pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('../src/pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('../src/pages/LoginPage/LoginPage'));

const ContactsPage = lazy(() => import('../src/pages/ContactsPage/ContactsPage'));

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

const App = () => {
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
            <RestrictedRoute redirectTo="/contacts" component={<RegistrationPage />} />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
          />
          {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Layout>
  );
};



export default App;

