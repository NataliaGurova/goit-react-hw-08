
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentTitle from "../../components/DocumentTitle";
import ContactList from "../../components/ContactList/ContactList"
import SearchBox from "../../components/SearchBox/SearchBox"
import ContactForm from "../../components/ContactForm/ContactForm"
import { fetchContacts } from '../../redux/contacts/operations';
import { selectContacts, selectError, selectIsLoading } from '../../redux/contacts/selectors';
// import css from './App.module.css'


// import { RegistrationForm } from './components/RegistrationForm/RegistrationForm';
// import { LoginForm } from './components/LoginForm/LoginForm';


export default function ContactsPage() {
  const dispatch = useDispatch();
  // const { items, isLoading, error } = useSelector(selectContacts);
  const items = useSelector(selectContacts)
  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectError)
  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  
  return (
    <div>
      <div>
        
        {/* <RegistrationForm />
        <LoginForm /> */}

      <DocumentTitle>Phonebook</DocumentTitle>
      <ContactForm />
      <SearchBox />
      {isLoading && <b>Loading tasks...</b>}
      {error && <b>{error}</b>}
      {items.length > 0 && <ContactList items={items} />}
      </div>
    </div>
  )
}