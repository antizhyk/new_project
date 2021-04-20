import React, {useCallback, useEffect, useState} from 'react';
import {Button, TextField, Checkbox, Form, FormLayout} from '@shopify/polaris';

export default function Forms() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [errorsPassword, setErrorsPassword] = useState(false);



//=============Experment=================
const validField = (event) =>{
    let valueField = event.target.value.match(/\w*@\w{2,7}\.\w{2,7}/);
    if(valueField){
        setErrors(false);
    }else{
        setErrors(true);
    }

}
    const validFieldPass = (event) =>{
        let valueField = event.target.value.match(/.{6,25}/);
        console.log(valueField);
        if(valueField){
            setErrorsPassword(false);
        }else{
            setErrorsPassword(true);
        }

    }
    //====================
    const handleSubmit = useCallback((_event) => {
        event.preventDefault();
        let emailValueForm = _event.target.querySelector('#email').getAttribute('value');
        let passwordValueForm = _event.target.querySelector('#password').getAttribute('value');
        let emailValue;
        let passValue;
        fetch(process.env.MIX_APP_URL + 'api/people', {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data =>  {
                emailValue = data[0].email
                passValue = data[0].password
            })
            .then(data =>{ if(emailValue == emailValueForm && passValue == passwordValueForm){
                console.log('exelent');
        }else{
                alert('Нет такого пользователя');
            }})

    }, []);



    const handleEmailChange = useCallback((value) => setEmail(value), []);
    const handlePasswordChange = useCallback((value) => setPassword(value), []);

    return (
        <Form

            onSubmit={handleSubmit}

            noValidate={true}>
            <FormLayout>
                <TextField
                    value={email}
                    onChange={handleEmailChange}
                    label="Email"
                    type="email"
                    error={errors}
                    onBlur={validField}
                    id='email'
                    helpText={
                        <span>
              Введите e-mail
            </span>
                    }
                />
                <TextField
                    onBlur={validFieldPass}
                    value={password}
                    onChange={handlePasswordChange}
                    id="password"
                    label="Password"
                    type="password"
                    minLength={6} maxLength={50}
                    error={errorsPassword}
                    helpText={
                        <span>
              Введите пароль
            </span>
                    }
                />
                {errorsPassword &&
                        <span>Длина пароля минимум 6 знаков</span>

                }
                <Button submit>Войти</Button>
            </FormLayout>
        </Form>
    );
}

