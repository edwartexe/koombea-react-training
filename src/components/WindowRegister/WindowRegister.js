import styles from "./WindowRegister.module.css";
import { server } from "../../libs/const";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Formik, Form, Field, useField, useFormikContext } from "formik";

import * as Yup from "yup";

import {useHistory } from "react-router-dom";

import { useMutation } from "react-query";

import {useState} from 'react';
import AlertBasic from "../Alert/Alert";
import AlertSmall from "../Alert/AlertSmall";

import axios from 'axios';

import { Box, Heading, Flex, Text, Button} from "@chakra-ui/react";

const createUser = async (newUsr)=> {
  axios.post(
    server+"users", 
    {...newUsr})
  .then(function (response) {
    return response
  })
  .catch(function (error) {
    console.log(error);
  });
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
  const [openAlert, setaopenAlert] = useState(false);
  const [openAlertSmall, setaopenAlertSmall] = useState(false);

  const [insertUsr] = useMutation(createUser, {
    onSuccess: ()=>{
      setaopenAlert(true)
    },
    onError: ()=>{
      setaopenAlertSmall(true)
    }
  });


  const submitForm = (values) => {
    console.log("values");
    if (values.pass !== values.passCon) {
      alert("The password and its confirmation must be the same");
      return;
    }

    axios.get(`${server}users?username=${encodeURIComponent( values.username )}`)
    .then(function (result) {
      if (result.data.length === 0) {
        insertUsr(values);
      } else {
        alert("That username already exists");
      }
    })
    .catch(function (error) {
      setaopenAlertSmall(true);
    });
    
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
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              submitForm(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ errors, isSubmitting }) => (
            <Form className={styles.form}>

              {openAlert? 
                <AlertBasic
                  title="User Registered"
                  bodyText="Your account has been created."
                  okText="Go to LogIn"
                  okAction={()=>history.push("/Login")}
                  showCancel={false}
                />
              :null
              }

              <h1 className={styles.title}>REGISTER</h1>

              <label htmlFor="username" className={styles.inputLabel}>
                Username:
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username:"
                  className={styles.input}
                />
                {errors.username ? (
                  <span className={styles.errorMessage}>{errors.username}</span>
                ) : null}
              </label>

              <Flex
                direction={{sm: "column", md:"row"}}
              >
                <label htmlFor="pass" className={styles.inputLabel}>
                  Password:
                  <Field
                    type="password"
                    id="pass"
                    name="pass"
                    placeholder="Password:"
                    className={styles.input}
                  />
                  {errors.pass ? (
                    <span className={styles.errorMessage}>{errors.pass}</span>
                  ) : null}
                </label>

                <span className={styles.spacer} />

                <label htmlFor="passCon" className={styles.inputLabel}>
                  Confirm Password:
                  <Field
                    type="password"
                    id="passCon"
                    name="passCon"
                    placeholder=" Password Confirm:"
                    className={styles.input}
                  />
                  {errors.passCon ? (
                    <span className={styles.errorMessage}>{errors.passCon}</span>
                  ) : null}
                </label>
              </Flex>


              <Flex
                direction={{sm: "column", md:"row"}}
              >
                <label htmlFor="name" className={styles.inputLabel}>
                  First Name:
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="First Name:"
                    className={styles.input}
                  />
                  {errors.name ? (
                    <span className={styles.errorMessage}>{errors.name}</span>
                  ) : null}
                </label>

                <span className={styles.spacer} />

                <label htmlFor="lastName" className={styles.inputLabel}>
                  Last Name:
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name:"
                    className={styles.input}
                  />
                  {errors.lastName ? (
                    <span className={styles.errorMessage}>{errors.lastName}</span>
                  ) : null}
                </label>
              </Flex>
              

              <label htmlFor="birthday" className={styles.inputLabel}>
                Birthday:
                <Bday id="birthday" name="birthday" />
                {errors.birthday ? (
                  <span className={styles.errorMessage}>{errors.birthday}</span>
                ) : null}
              </label>

              {openAlertSmall? 
                <AlertSmall 
                  status="error"
                  title="Conection Error"
                  text="The Account could not be created."
                  cancelAction={()=>setaopenAlertSmall(false)}
                />
              :null
              }

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
