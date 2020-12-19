import styles from "./WindowCreateEvent.module.css";
import { server } from "../../libs/const";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Formik, Form, Field, useField, useFormikContext } from "formik";

import * as Yup from "yup";

import {useHistory } from "react-router-dom";

import { useMutation } from "react-query";

const createEvent = async (newEvent)=> {
  const res = await fetch(server+"events", {
        method: "POST",
        headers: { "Content-Type": "application/json",  },
        body: JSON.stringify({ ...newEvent }),
      });
  const {resres} = await res.json();
  return resres;
}


const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  location: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  hostname: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  type: Yup.string()
    .min(4, "Select an Option")
    .required("Required"),
  tags: Yup.string()
    .max(30, "Too Long!"),
  description: Yup.string()
    .max(50, "Too Long!"),
  date: Yup.date()
    .required("Required"),
});

const EventDate = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      placeholderText="Event Date"
      className={styles.input}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    >
      <p className={styles.dateText}>Select the Event's Date</p>
    </DatePicker>
  );
};

function WindowCreateEvent (props) {
  let history = useHistory();

  const [insertEvent] = useMutation(createEvent, {
    onSuccess: ()=>{
      history.push("/List")
    }
  });

  return (
    <div className={styles.Window}>
      <Formik
        initialValues={{
          name: "",
          location: "",
          hostname: "",
          type: "",
          date: "",
          tags: "",
          description: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            insertEvent(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ errors, isSubmitting }) => (
          <Form className={styles.form}>
            <h1 className={styles.title}>CREATE EVENT</h1>

            <label htmlFor="name" className={styles.inputLabel}>
              Event Name:
              {errors.name ? (
                <span className={styles.errorMessage}>
                  {errors.name}
                </span>
              ) : null}
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Event Name:"
              className={styles.input}
            />

            <label htmlFor="location" className={styles.inputLabel}>
              Location:
              {errors.location ? (
                <span className={styles.errorMessage}>
                  {errors.location}
                </span>
              ) : null}
            </label>
            <Field
              type="text"
              id="location"
              name="location"
              placeholder="Location:"
              className={styles.input}
            />

            <label htmlFor="hostname" className={styles.inputLabel}>
              Who is the Host:
              {errors.hostname ? (
                <span className={styles.errorMessage}>
                  {errors.hostname}
                </span>
              ) : null}
            </label>
            <Field
              type="text"
              id="hostname"
              name="hostname"
              placeholder="Who is the Host:"
              className={styles.input}
            />

            <label htmlFor="type" className={styles.inputLabel}>
              Event Type:
              {errors.type ? (
                <span className={styles.errorMessage}>
                  {errors.type}
                </span>
              ) : null}
            </label>
            <Field 
              id="type" 
              name="type" 
              as="select" 
              className={styles.input}
              /*defaultValue={"Public"}*/
            >
              <option value="">select type...</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </Field>

            <label htmlFor="tags" className={styles.inputLabel}>
              Add Tags:
              {errors.tags ? (
                <span className={styles.errorMessage}>
                  {errors.tags}
                </span>
              ) : null}
            </label>
            <Field
              type="text"
              id="tags"
              name="tags"
              placeholder="Add Tags:"
              className={styles.input}
            />

            <label htmlFor="description" className={styles.inputLabel}>
              Add Description:
              {errors.description ? (
                <span className={styles.errorMessage}>
                  {errors.description}
                </span>
              ) : null}
            </label>
            <Field
              type="text"
              id="description"
              name="description"
              placeholder="Add Description:"
              className={styles.input}
            />

            <label htmlFor="date" className={styles.inputLabel}>
              Event Date:
              {errors.date ? (
                <span className={styles.errorMessage}>
                  {errors.date}
                </span>
              ) : null}
            </label>
            <EventDate id="date" name="date" />

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

export default WindowCreateEvent;
