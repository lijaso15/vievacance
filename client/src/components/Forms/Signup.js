// Render Prop
import React from 'react';
import { Formik, Form, Field } from 'formik'
// import Debug from '../../utils/Debug'
import * as Yup from "yup"
import axios from "axios"
import Input from './Input'
import { connect } from 'react-redux'



const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, 'username must be at least 6 characters')
        .max(24, 'username cannot be greater than 20 characters')
        .required('username is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'password must be at least 6 characters')
        .max(20, 'password cannot be greater than 20 characters')
        .matches(/^(?=.*[a-z])/g, 'The password must contain at least 1 lowercase alphabetical character')
        .matches(/^(?=.*[A-Z])/g, 'The password must contain at least 1 uppercase alphabetical character')
        .matches(/^(?=.*[0-9])/g, 'The password must contain at least 1 numeric character')
        .required('Required')
});


const Signup = ({ active }) => {
    return <div id="signup" className="box" style={{ display: active ? 'block' : 'none' }}>
        <h1 className="title is-4">Signup</h1>
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
                success: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, actions) => {
                axios.post('/users', values).then((res) => {
                    if (res.status === 200) {
                        actions.setFieldValue('success', 'Success! Thank you for signing up.')
                    } else {
                        alert(res)
                    }
                }).catch((err) => {
                    if (err.response) {
                        actions.setErrors(err.response.data)
                    } else {
                        alert(err)
                    }
                })
                actions.setSubmitting(false)
            }
            }
            render={({ values, isSubmitting }) => (
                <Form>
                    <Field name="username" component={Input} type="text" placeholder="e.g. jellydonuts" icons={{ left: 'user', right: 'check' }} />
                    <Field name="email" component={Input} type="email" placeholder="e.g. jasonli@frontend.io" icons={{ left: 'envelope', right: 'check' }} />
                    <Field name="password" component={Input} type="password" placeholder="•••••••" icons={{ left: 'key', right: 'check' }} />
                    <button className="button is-link" type="submit" disabled={isSubmitting}>Submit</button>
                    {values.success && <article className="message is-success is-small">
                        <div className="message-body">
                            {values.success}
                        </div>
                    </article>}
                </Form>
            )}
        />
    </div>
}

const mapStateToProps = state => {
    return {
        active: state.toggles.signup
    }
}



export default connect(mapStateToProps)(Signup)