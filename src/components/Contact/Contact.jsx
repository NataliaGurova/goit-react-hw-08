import css from "./Contact.module.css"
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useDispatch } from 'react-redux'
import { deleteContact } from "../../redux/contacts/operations";



const Contact = ({ contact }) => { 
  const { id, name, number } = contact;
  const dispatch = useDispatch()

  const handleDeleteContact = () => {
    dispatch(deleteContact(id));
  }

  return (
    <div className={css.item}>
      <div>
        <p className={css.iconName}><BsFillPersonFill size={20}/> {name}</p>
        <p><BsFillTelephoneFill /> {number}</p>
      </div>
      <button className={css.btn} onClick={handleDeleteContact}>Delete</button>

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