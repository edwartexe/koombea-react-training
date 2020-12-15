import { Component } from "react";
import styles from "./WindowRegister.module.css";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Formik, Form, Field, useField, useFormikContext } from "formik";

import * as Yup from "yup";

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

class WindowRegister extends Component {
  submitForm = (values) => {
    if (values.pass !== values.passCon) {
      alert("The password and its confirmation must be the same");
      return;
    }

    fetch(
      `http://localhost:5000/users?username=${encodeURIComponent(
        values.username
      )}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.length === 0) {
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: values.username,
                pass: values.pass,
                name: values.name,
                lastName: values.lastName,
                birthday: values.birthday,
                avatar: "",
              }),
            })
              .then(alert("Ha sido Registrado"))
              .then(this.props.setWindow("Login"));
          } else {
            alert("That username already exists");
          }
        },
        (error) => {
          console.log("error " + error);
        }
      );
  };

  render() {
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
              this.submitForm(values);
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

              <p>{this.props.regMsg}</p>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default WindowRegister;
