import styles from "./WindowLogin.module.css";

import { Formik, Form, Field } from "formik";


const WindowLogin = (props) => (
  <div className={styles.Window}>

    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          props.login(values.username, values.password);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <h1 className={styles.title}>LOG IN</h1>

          <label htmlFor="username" className={styles.inputLabel}>
            Username: 
          </label>
          <Field
            type="text"
            id="username"
            name="username"
            placeholder="Username:"
            className={styles.input}
          />

          <label htmlFor="password" className={styles.inputLabel}>
            Password: 
          </label>
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Password:"
            className={styles.input}
          />

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={styles.submit}
          >
            Log In
          </button>


          <p>{props.loginMsg}</p>
        </Form>
      )}
    </Formik>
  </div>
);

export default WindowLogin;
