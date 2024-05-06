import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUser);
// console.log(selectUser);

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {name}</p>
      <button className={css.btn} type="button" onClick={() => dispatch(logOut())}>
        Logout
      </button>
    </div>
  );
};
