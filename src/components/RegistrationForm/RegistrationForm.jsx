
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegistrationForm.module.css';


// import css from './RegisterForm.module.css';

export const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );

    form.reset();
  };

  return (
    <>
      <h4>Register, please!</h4>
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Username
        <input className={css.inputLogin} type="text" name="name" />
      </label>
      <label className={css.label}>
        Email
        <input className={css.inputLogin} type="email" name="email" />
      </label>
      <label className={css.label}>
        Password
        <input className={css.inputLogin} type="password" name="password" />
      </label>
      <button className={css.btn} type="submit">Register</button>
    </form>
    </>
  );
};