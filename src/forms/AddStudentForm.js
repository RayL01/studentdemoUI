import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, Button, Tag } from 'antd';
import { addNewStudent } from "../client";
const inputBottomMargin = { marginBottom: '5px' };
const tagStyle = { backgroundColor: '#f56a00', color: 'white', ...inputBottomMargin };
const AddStudentForm = (props) => (


    <Formik
        initialValues={{ firstName: '', lastName: '', email: '', gender: '' }}
        validate={values => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Email Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            if (!values.gender) {
                errors.gender = 'Gender is required';
            } else if (!['MALE', 'male', 'FEMALE', 'female'].includes(values.gender)) {
                errors.gender = 'Gender must be (MALE, male, FEMALE, female)';
            }
            if (!values.firstName) {
                errors.firstName = 'First Name is required';
            }
            if (!values.lastName) {
                errors.lastName = 'Last Name is required';
            }
            return errors;
        }}
        onSubmit={(student, { setSubmitting }) => {
            addNewStudent(student).then(() => {
                props.onSuccess();
                setSubmitting(false);
            });
        }}>
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            submitForm,
            isValid
            /* and other goodies */
        }) => (
            <form onSubmit={handleSubmit}>
                <Input
                    style={inputBottomMargin}
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder="First Name. e.g John"
                />
                {errors.firstName && touched.firstName && <Tag style={tagStyle}>{errors.firstName}</Tag>}
                <Input
                    style={inputBottomMargin}
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    placeholder="Last Name. e.g James"
                />
                {errors.lastName && touched.lastName && <Tag style={tagStyle}>{errors.lastName}</Tag>}
                <Input
                    style={inputBottomMargin}
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="email e.g example@gmail.com"
                />
                {errors.email && touched.email && <Tag style={tagStyle}>{errors.email}</Tag>}
                <Input
                    style={inputBottomMargin}
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                    placeholder="gender e.g MALE or FEMALE"
                />
                {errors.gender && touched.gender && <Tag style={tagStyle}>{errors.gender}</Tag>}
                <Button
                    style={{ border: '2px solid #f56a00', color: '#f56a00' }}
                    type="submit"
                    onClick={() => submitForm()}
                    disabled={isSubmitting }

>
                    Submit
                </Button>

            </form>
        )}
    </Formik>

);
export default AddStudentForm;
