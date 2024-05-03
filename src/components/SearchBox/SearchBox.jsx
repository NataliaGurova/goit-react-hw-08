
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import css from "./SearchBox.module.css"

const SearchBox = () => {
  const dispatch = useDispatch();

const handleInputChange = (e) => {
  const newValue = e.target.value;  
  dispatch(changeFilter(newValue));
  };

  return (
    <div className={css.contact}>
      <label>Find contacts by name</label>
      <input className={css.input} type="text" onChange={handleInputChange}/>
    </div>
  );
};

export default SearchBox;


// export const TaskEditor = () => {
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const form = e.currentTarget;
//     const text = form.elements.text.value;
//     if (text !== '') {
//       dispatch(addTask(text));
//       form.reset();
//       return;
//     }
//     alert('Task cannot be empty. Enter some text!');
//   };

//   return (
//     <form className={css.form} onSubmit={handleSubmit}>
//       <input name="text" className={css.input} />
//       <button type="submit" className={css.button}>
//         Add task
//       </button>
//     </form>
//   );
// };