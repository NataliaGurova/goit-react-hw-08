import css from "./Contact.module.css"
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";

import { AiOutlineClose } from "react-icons/ai";
// import { LuPencil } from "react-icons/lu";
import { useDispatch } from 'react-redux'
import { deleteContact, editContact } from "../../redux/contacts/operations";



const Contact = ({ contact }) => { 
  const { id, name, number } = contact;
  const dispatch = useDispatch()

  const handleDeleteContact = () => {
    dispatch(deleteContact(id));
  }

 

// const handleEditContact = () => {
//   const updatedContact = {
//     id: id, // або просто id
//     name: 'нове ім\'я', // оновлене ім'я контакту
//     number: 'новий номер' // оновлений номер контакту
//   };

//   dispatch(editContact(updatedContact));
// }


  return (
    <div className={css.item}>
      <div>
        <p className={css.iconName}><BsFillPersonFill size={20}/> {name}</p>
        <p><BsFillTelephoneFill /> {number}</p>
      </div>
      <div className={css.buttonDiv}>
      <button className={css.btn} onClick={handleDeleteContact}><AiOutlineClose /></button>
        {/* <button className={css.btn} onClick={handleEditContact}><LuPencil size={16} /></button> */}
      </div>
    </div>
  )
}

export default Contact;


// export const Task = ({ id, text }) => {
//   const dispatch = useDispatch();

//   const handleDelete = () => dispatch(deleteTask(id));

//   return (
//     <div className={css.wrapper}>
//       <p className={css.text}>{text}</p>
//       <button type="button" className={css.button} onClick={handleDelete}>
//         Delete
//       </button>
//     </div>
//   );
// };