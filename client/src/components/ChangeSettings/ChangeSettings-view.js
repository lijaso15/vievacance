import React from 'react';
import { Formik, Form, Field } from 'formik'
import * as Yup from "yup"
import axios from "axios"
import Input from '../Forms/Input'
import PropTypes from 'prop-types'
import equalTo from '../../utils/equalTo'
import './ChangeSettings.css'
import PhotoCards from '../Cards/PhotoCards';

Yup.addMethod(Yup.string, 'equalTo', equalTo);

const ChangeUsernameSchema = Yup.object().shape({
    'new username:': Yup.string()
        .min(6, 'username must be at least 6 characters')
        .max(24, 'username cannot be greater than 20 characters')
        .required('username is required')
})

const ChangePasswordSchema = Yup.object().shape({
    'new password:': Yup.string()
        .min(6, 'password must be at least 6 characters')
        .max(20, 'password cannot be greater than 20 characters')
        .matches(/^(?=.*[a-z])/g, 'The password must contain at least 1 lowercase alphabetical character')
        .matches(/^(?=.*[A-Z])/g, 'The password must contain at least 1 uppercase alphabetical character')
        .matches(/^(?=.*[0-9])/g, 'The password must contain at least 1 numeric character')
        .required('Required'),
    'confirm password:': Yup.string()
        .equalTo(Yup.ref('new password:'), 'Passwords must match')
        .required('Required')
});


const ChangeSettingsView = ({ email, username, _id, changeProfilePicture, deletePhotos }) => {
    return <div id="changeSettings" className="column">
        <div id="info">
            <b> Email: </b>
            <span className="subtitle is-link"> {email} </span>

        </div>

        <div id="info" className="columns">
            <div className="column is-one-third">
                <Formik
                    initialValues={{
                        'new username:': '',
                        success: ''
                    }}
                    validationSchema={ChangeUsernameSchema}
                    onSubmit={(values, actions) => {
                        axios.post(`/users/changeusername/${_id}`, values).then(res => {
                            if (res.status === 200) {
                                actions.setFieldValue('success', `Success! Your username has been changed to ${values['new username:']}`)
                            } else {
                                alert(res)
                            }
                        }).catch(err => {
                            if (err.response) {
                                actions.setErrors(err.response.data)
                            } else {
                                alert(err)
                            }
                        })
                        actions.setSubmitting(false)
                    }}
                    render={({ values, isSubmitting }) => (
                        <Form>
                            <Field name="new username:" component={Input} type="text" placeholder={username} icons={{ left: 'user', right: 'check' }} />
                            <button className="button is-link" type="submit" disabled={isSubmitting}>Change Username</button>
                            {values.success && <article className="message is-success is-small">
                                <div className="message-body">
                                    {values.success}
                                </div>
                            </article>}
                        </Form>
                    )}
                />
            </div>
            <div className="column is-one-third">
                <Formik
                    initialValues={{
                        'new password:': '',
                        'confirm password:': '',
                        success: ''
                    }}
                    validationSchema={ChangePasswordSchema}
                    onSubmit={(values, actions) => {
                        axios.post(`/users/changepassword/${_id}`, values).then(res => {
                            if (res.status === 200) {
                                actions.setFieldValue('success', `Success! Your password has been changed!`)
                            } else {
                                alert(res)
                            }
                        }).catch(err => {
                            if (err.response) {
                                actions.setErrors({ 'new password:': 'An error has occurred. Please try again later' })
                            } else {
                                alert(err)
                            }
                        })
                    }}
                    render={({ values, isSubmitting }) => (
                        <Form>
                            <Field name="new password:" component={Input} type="password" placeholder="•••••••" icons={{ left: 'key', right: 'check' }} />
                            <Field name="confirm password:" component={Input} type="password" placeholder="•••••••" icons={{ left: 'key', right: 'check' }} />
                            <button className="button is-link" type="submit" disabled={isSubmitting}>Change Password</button>
                            {values.success && <article className="message is-success is-small">
                                <div className="message-body">
                                    {values.success}
                                </div>
                            </article>}
                        </Form>
                    )}
                />
            </div>
        </div>
        <form id="info" action={`/photos/${_id}`} method="post" enctype="multipart/form-data">
            <input type="file" name="avatar" />
            <input className="btn btn-primary" type="submit" value="upload picture" />
        </form>
        <PhotoCards owner={_id} />
        <div className="buttons">
            <button className="button is-primary" onClick={changeProfilePicture}>Change Profile Picture</button>
            <button className="button is-primary" onClick={deletePhotos}>Delete Photos</button>
        </div>
    </div>
}


ChangeSettingsView.propTypes = {
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    changeProfilePicture: PropTypes.func.isRequired,
    deletePhotos: PropTypes.func.isRequired
}

export default ChangeSettingsView