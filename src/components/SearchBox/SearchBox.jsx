
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
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