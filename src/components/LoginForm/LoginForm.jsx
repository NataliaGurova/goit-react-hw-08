
import { useDispatch } from 'react-redux';
import css from './LoginForm.module.css';
import { logIn } from '../../redux/auth/operations';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    )
      .unwrap()
      .then(() => {
        console.log('login success');
      })
      .catch(() => {
        console.log('login error');
      });

    form.reset();
  };

  return (
    <>
      <h4>If you registered, please Log In!</h4>
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Email
        <input className={css.inputLogin} type="email" name="email" />
      </label>
      <label className={css.label}>
        Password
        <input className={css.inputLogin} type="password" name="password" />
      </label>
      <button className={css.btn} type="submit">Log In</button>
      </form>
      </>
  );
};
