import React from 'react';
import { Formik, Form, Field } from 'formik'
// import Debug from '../../utils/Debug'
// import * as Yup from "yup"
import axios from "axios"
import Input from './Input'
import { connect } from 'react-redux'
import { signedIn, errorCleared } from '../../actions'
import './login.css'

const Signin = ({ active, err, signedIn, errorCleared }) => {
    // console.log('err?: ' + err)
    // console.log('active?:' + active)
    return <div style={{ display: active ? 'block' : 'none' }} id="signin" className="box">
        <h1 className="title is-4">Signin</h1>
        <Formik
            initialValues={{
                email: '',
                password: '',
                success: ''
            }}
            onSubmit={(values, actions) => {
                errorCleared()
                axios.post('/users/login', values).then((res) => {
                    console.log(res)
                    if (res.status === 200) {
                        actions.setFieldValue('success', 'Success!')
                        setTimeout(() => {
                            signedIn(res.data)
                        }, 1500)
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
                    <Field name="email" component={Input} type="email" placeholder="e.g. jasonli@frontend.io" icons={{ left: 'envelope', right: 'check' }} />
                    <Field name="password" component={Input} type="password" placeholder="•••••••" icons={{ left: 'key', right: 'check' }} />
                    <button className="button is-link" type="submit" disabled={isSubmitting}>Submit</button>
                    {(err || values.success) && <article className={err ? "message is-danger is-small" : "message is-success is-small"}>
                        <div className="message-body">
                            {err ? 'Please login to view your profile' : values.success}
                        </div>
                    </article>}

                    {/* <Debug /> */}
                </Form>
            )}
        />
    </div>
}

const mapStateToProps = state => {
    return {
        active: state.err.signin ? true : state.toggles.signin,
        err: state.err.signin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signedIn: (id) => { return dispatch(signedIn(id)) },
        errorCleared: () => { return dispatch(errorCleared()) }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Signin)