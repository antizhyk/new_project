import React, {useCallback, useState} from 'react';
import {Button, TextField, Checkbox, Form, FormLayout} from '@shopify/polaris';

export default function FormsRegister() {
    const [newsletter, setNewsletter] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [errorsPassword, setErrorsPassword] = useState(false);

//=============Experment=================
    const validField = (event) =>{
        let valueField = event.target.value.match(/\w*@\w{2,7}\.\w{2,7}/);
        console.log(valueField);
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
        setEmail('');
        setPassword('');
        setNewsletter(false);
    }, []);

    const handleNewsLetterChange = useCallback(
        (value) => setNewsletter(value),
        [],
    );

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
                <Button submit>Регистрация</Button>
            </FormLayout>
        </Form>
    );
}

