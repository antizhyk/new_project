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
        if(valueField){
            setErrors(false);
        }else{
            setErrors(true);
        }

    }
    const validFieldPass = (event) =>{
        let valueField = event.target.value.match(/.{6,25}/);
        if(valueField){
            setErrorsPassword(false);
        }else{
            setErrorsPassword(true);
        }

    }
    //====Функция отправки данных==========
    const ajaxSend = async (formData) => {
        const fetchResp = await fetch(process.env.MIX_APP_URL + 'api/send', {
            method: 'POST',
            body: formData
        });
        return await fetchResp.text();
    };
    //===============================

    //====================
    const handleSubmit = useCallback((_event) => {
        event.preventDefault();
        let emailValueForm = _event.target.querySelector('#emailr').getAttribute('value');
        let passwordValueForm = _event.target.querySelector('#passwordr').getAttribute('value');
        const formData = new FormData(event.target);
        for(let value of formData.values()){
            console.log(value);
        }
        ajaxSend(formData)
            .then(responce => {
                console.log(responce)
            })
            .catch(err => console.error(err))

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
            name='send'
            id='send'
            noValidate={true}>
            <FormLayout>
                <TextField
                    value={email}
                    onChange={handleEmailChange}
                    label="Email"
                    id="emailr"
                    type="email"
                    name="email"
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
                    name="password"
                    onChange={handlePasswordChange}
                    label="Password"
                    type="password"
                    id="passwordr"
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

