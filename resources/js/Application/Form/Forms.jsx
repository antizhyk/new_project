import React, {useCallback, useEffect, useState} from 'react';
import {Button, TextField, Form, FormLayout} from '@shopify/polaris';
import axios from 'axios';

export default function Forms() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [errorsPassword, setErrorsPassword] = useState(false);


//=============Experment=================
    const validField = (event) => {
        let valueField = event.target.value.match(/\w*@\w{2,7}\.\w{2,7}/);
        if (valueField) {
            setErrors(false);
        } else {
            setErrors(true);
        }

    }
    const validFieldPass = (event) => {
        let valueField = event.target.value.match(/.{6,25}/);
        if (valueField) {
            setErrorsPassword(false);
        } else {
            setErrorsPassword(true);
        }

    }

    //====================
    const handleSubmit = useCallback((_event) => {
        let emailValueForm = _event.target.querySelector('#email').getAttribute('value');
        let passwordValueForm = _event.target.querySelector('#password').getAttribute('value');
        const formData = new FormData(event.target);
        console.log(emailValueForm);
        console.log(passwordValueForm);
        event.preventDefault();
        // axios.get('/sanctum/csrf-cookie', {
        //     headers: { 'Retry-After': 3600 }
        // }).then(

        axios.post('login', {
            email: emailValueForm,
            password: passwordValueForm
        })
            .then(response => location.href = '/')
            .catch(error => console.log(error))
        // );
    }, []);


    const handleEmailChange = useCallback((value) => setEmail(value), []);
    const handlePasswordChange = useCallback((value) => setPassword(value), []);

    return (
        <div className="block__login-wrap">
        <div className="block__login">
        <Form
            onSubmit={handleSubmit}
            name='people'
            id='people'
            noValidate={true}>
            <FormLayout>
                <TextField
                    value={email}
                    onChange={handleEmailChange}
                    label="?????????? ????????????????"
                    type="email"
                    error={errors}
                    onBlur={validField}
                    id='email'
                    name="email"
                    helpText={
                        <span>
              ?????????????? e-mail
            </span>
                    }
                />
                <TextField
                    onBlur={validFieldPass}
                    value={password}
                    onChange={handlePasswordChange}
                    id="password"
                    label="???????????? ????????????????"
                    type="password"
                    name="password"
                    minLength={6} maxLength={50}
                    error={errorsPassword}
                    helpText={
                        <span>
              ?????????????? ????????????
            </span>
                    }
                />
                {errorsPassword &&
                <span>?????????? ???????????? ?????????????? 6 ????????????</span>

                }

                <Button submit>??????????</Button>
            </FormLayout>
            <a href="http://0.0.0.0:8084/register" className="block__link-registration">??????????????????????</a>
        </Form>
        </div>
        </div>
    );
}

