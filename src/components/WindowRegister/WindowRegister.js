import styles from "./WindowRegister.module.css";
import { server } from "../../libs/const";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Formik, Form, Field, useField, useFormikContext } from "formik";

import * as Yup from "yup";

import {useHistory } from "react-router-dom";

import { useMutation } from "react-query";

const createUser = async (newUsr)=> {
  console.log("createUser");
  console.log(newUsr);
  const res = await fetch(server+"users", {
        method: "POST",
        headers: { "Content-Type": "application/json",  },
        body: JSON.stringify({ ...newUsr }),
      });
  const {resres} = await res.json();
  return resres;
}

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  pass: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  passCon: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  name: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  avatar: Yup.string(),
  birthday: Yup.date().required("Required"),
});



const Bday = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <DatePicker
      {...field}
      {...props}
      placeholderText="Birthday"
      className={styles.input}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    >
      <p className={styles.dateText}>
        Pick your <b>Birthday</b>
      </p>
    </DatePicker>
  );
};



function WindowRegister (props) {
  let history = useHistory();

  const [insertUsr] = useMutation(createUser, {
    onSuccess: ()=>{
      history.push("/Login")
    }
  });


  const submitForm = (values) => {
    console.log("values");
    console.log(values);
    if (values.pass !== values.passCon) {
      alert("The password and its confirmation must be the same");
      return;
    }

    fetch( `${server}users?username=${encodeURIComponent( values.username )}`  )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.length === 0) {
            insertUsr(values);
          } else {
            alert("That username already exists");
          }
        },
        (error) => {
          console.log("error " + error);
        }
      );
  };

  
    return (
      <div className={styles.Window}>
        <Formik
          initialValues={{
            username: "",
            pass: "",
            passCon: "",
            name: "",
            lastName: "",
            avatar: "",
            birthday: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              submitForm(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ errors, isSubmitting }) => (
            <Form className={styles.form}>
              <h1 className={styles.title}>REGISTER</h1>

              <label htmlFor="username" className={styles.inputLabel}>
                Username:
                {errors.username ? (
                  <span className={styles.errorMessage}>{errors.username}</span>
                ) : null}
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Username:"
                className={styles.input}
              />

              <label htmlFor="pass" className={styles.inputLabel}>
                Password:
                {errors.pass ? (
                  <span className={styles.errorMessage}>{errors.pass}</span>
                ) : null}
              </label>
              <Field
                type="password"
                id="pass"
                name="pass"
                placeholder="Password:"
                className={styles.input}
              />

              <label htmlFor="passCon" className={styles.inputLabel}>
                Password Confirm:
                {errors.passCon ? (
                  <span className={styles.errorMessage}>{errors.passCon}</span>
                ) : null}
              </label>
              <Field
                type="password"
                id="passCon"
                name="passCon"
                placeholder=" Password Confirm:"
                className={styles.input}
              />

              <label htmlFor="name" className={styles.inputLabel}>
                First Name:
                {errors.name ? (
                  <span className={styles.errorMessage}>{errors.name}</span>
                ) : null}
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="First Name:"
                className={styles.input}
              />

              <label htmlFor="lastName" className={styles.inputLabel}>
                Last Name:
                {errors.lastName ? (
                  <span className={styles.errorMessage}>{errors.lastName}</span>
                ) : null}
              </label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name:"
                className={styles.input}
              />

              <label htmlFor="birthday" className={styles.inputLabel}>
                Birthday:
                {errors.birthday ? (
                  <span className={styles.errorMessage}>{errors.birthday}</span>
                ) : null}
              </label>
              <Bday id="birthday" name="birthday" />

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submit}
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  
}

export default WindowRegister;
