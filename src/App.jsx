
import css from './App.module.css'
import ContactForm from "./components/ContactForm/ContactForm"
import SearchBox from "./components/SearchBox/SearchBox"
import ContactList from "./components/ContactList/ContactList"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from './redux/contacts/operations';
import { selectContacts, selectError, selectIsLoading } from './redux/contacts/selectors';


// import { RegistrationForm } from './components/RegistrationForm/RegistrationForm';


function App() {
  const dispatch = useDispatch();
  // const { items, isLoading, error } = useSelector(selectContacts);
  const items = useSelector(selectContacts)
  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectError)
  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  
  return (
    <div className={css.section}>
      <div className={css.container}>
        
      {/* <RegistrationForm/> */}

      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && <b>Loading tasks...</b>}
      {error && <b>{error}</b>}
      {items.length > 0 && <ContactList items={items} />}
      </div>
    </div>
  )
}

export default App;

