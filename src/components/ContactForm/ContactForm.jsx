
import { useDispatch } from "react-redux";
import css from "./ContactForm.module.css"
import { Formik, Form, Field, ErrorMessage } from "formik";
// import { nanoid } from 'nanoid'

import * as Yup from 'yup';
import { addContact } from "../../redux/contacts/operations";
// import { addContact } from "../../redux/contactsOps";


const initialValues = {
  id: "", 
  name: "",
  number: ""
};

const FormSchema = Yup.object().shape({
  name: Yup.string().trim().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
	number: Yup.string()
    .matches(/^\+?[ ()0-9-]+$/, "Invalid phone number").min(3, "Too Short!").max(50, "Too Long!").required("Required"),
});

const ContactForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = ({name, number}, actions) => {
  //  const newContact = {
  //     id: nanoid(),
  //     name: values.name,
  //     number: values.number,
  //   };
    dispatch(addContact({name, number}));

		actions.resetForm();   
	};


  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FormSchema}>
    <Form className={css.submitForm}>
      <label className={css.userLabel}>Name</label>
        <Field type="text" name="name" className={css.userName} />
        <ErrorMessage name='name' component='p' className={css.error} />
      <label className={css.numberLabel}>Number</label>
        <Field type="text" name="number" className={css.numberName} />
        <ErrorMessage name='number' component='p' className={css.error} />
      <button className={css.btn} type="submit">Add contact</button>
    </Form>
    </Formik>
  );
};

export default ContactForm;