import styles from "./WindowLogin.module.css";
import { server } from "../../libs/const";
import { useState } from "react";

import { useHistory } from "react-router-dom";

import { Formik, Form, Field } from "formik";

import { AuthContext } from "../../Context/Auth";
import { useContext } from "react";

import AlertSmall from "../Alert/AlertSmall";

import axios from "axios";

const WindowLogin = (props) => {
  let history = useHistory();
  const { setSession } = useContext(AuthContext);

  const [responceMsg, setResponce] = useState("");
  const [openAlertSmall, setaopenAlertSmall] = useState(false);

  const setAccount = (usr, pas) => {
    axios
      .get(
        `${server}users?username=${encodeURIComponent(
          usr
        )}&pass=${encodeURIComponent(pas)}`
      )
      .then(function (result) {
        if (result.data.length > 0) {
          setSession({ ...result.data[0] });
          localStorage.setItem("rememberSessionID", result.data[0].id);
          history.push({ pathname: "/List" });
        } else {
          setResponce("Incorrect Username or Password");
        }
      })
      .catch(function (error) {
        setaopenAlertSmall(true);
      });
  };

  return (
    <div className={styles.Window}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setAccount(values.username, values.password);
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

            {openAlertSmall ? (
              <AlertSmall
                status="error"
                title="Conection Error"
                text="Login Failed."
                cancelAction={() => setaopenAlertSmall(false)}
              />
            ) : (
              <p>{responceMsg}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submit}
            >
              Log In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default WindowLogin;
