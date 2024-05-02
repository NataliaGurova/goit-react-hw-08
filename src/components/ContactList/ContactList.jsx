
import { useSelector } from "react-redux"
import Contact from "../Contact/Contact"
import css from "./ContactList.module.css"
import { selectFilteredContacts } from "../../redux/filters/selectors";
// import { selectFilteredContacts } from "../../redux/contactsSlice";
// import { selectFilteredContacts } from "../../redux/contacts/slice";


const ContactList = () => { 
  
  const visibleContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.list}>
      {visibleContacts.map((contact) => {
          return (
            <li key={contact.id}>
              <Contact contact={contact} />
            </li>
          );
        })}
    </ul>
  )
}

export default ContactList;