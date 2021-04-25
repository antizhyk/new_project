import React, {useCallback, useState} from 'react';
import {Button, TextField, Checkbox, Form, FormLayout} from '@shopify/polaris';
import axios from "axios";

export default function FormsRegister() {
    const [newsletter, setNewsletter] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordDouble, setPasswordDouble] = useState('');
    const [errors, setErrors] = useState(false);
    const [errorsName, setErrorsName] = useState(false);
    const [errorsPassword, setErrorsPassword] = useState(false);
    const [errorsDoublePassword, setErrorsDoublePassword] = useState(false);
    let countValid = 0;
//=============Experment=================
    const validField = (event) =>{
        let valueField = event.target.value.match(/\w*@\w{2,7}\.\w{2,7}/);
        if(valueField){
            setErrors(false);
        }else{
            setErrors(true);
        }

    }
    const validFieldName = (event) =>{
        let valueField = event.target.value.match(/\w{1,4}/);
        if(valueField){
            setErrorsName(false);
        }else{
            setErrorsName(true);
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
    const validFieldPassDouble = (event) =>{
        let valueField = event.target.value.match(/.{6,25}/);
        console.log(password)
        if(valueField && event.target.value === password){
            setErrorsDoublePassword(false);
        }else{
            setErrorsDoublePassword(true);
        }

    }
    //====Функция отправки данных==========
    // const ajaxSend = async (formData) => {
    //     const fetchResp = await fetch( 'register', {
    //         method: 'POST',
    //         body: formData
    //     });
    //     return await fetchResp.text();
    // };

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

        let nameValueForm = _event.target.querySelector('#namelr').getAttribute('value');
        let passwordValueForm = _event.target.querySelector('#passwordr').getAttribute('value');
        let passwordDoubleValueForm = _event.target.querySelector('#passwordrd').getAttribute('value');
        const formData = new FormData(event.target);
        let countField = 0;
        for(let pair of formData.entries()){
            console.log(typeof pair[1]);
            if(pair[1] === ''){
                countField++;
            }
        }
        if(countField > 0){
            alert('Заполните все поля')
        }else {
            axios.post('register', {

                name: nameValueForm,
                email: emailValueForm,
                password: passwordValueForm,
                password_confirmation: passwordDoubleValueForm


            })
                .then(response => location.href = '/warehouse')
                .catch(error => console.log(error))
            setName('');
            setEmail('');
            setPassword('');
            setPasswordDouble('');
            setNewsletter(false);
        , []);

    const handleNewsLetterChange = useCallback(
        (value) => setNewsletter(value),
        [],
    );

    const handleEmailChange = useCallback((value) => setEmail(value), []);
    const handleNameChange = useCallback((value) => setName(value), []);
    const handlePasswordChange = useCallback((value) => setPassword(value), []);
    const handlePasswordDoubleChange = useCallback((value) => setPasswordDouble(value), []);

    return (
        <div className="block__login-wrap">
            <div className="block__login">
        <Form
            onSubmit={handleSubmit}
            name='send'
            id='send'
            noValidate={true}>
            <FormLayout>
                <TextField
                    value={name}
                    onChange={handleNameChange}
                    label="Name"
                    id="namelr"
                    type="text"
                    name="name"
                    error={errorsName}
                    onBlur={validFieldName}
                    helpText={
                        <span>
              Введите имя
            </span>
                    }/>
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
                <TextField
                    onBlur={validFieldPassDouble}
                    value={passwordDouble}
                    name="passwordDouble"
                    onChange={handlePasswordDoubleChange}
                    label="Password Double"
                    type="password"
                    id="passwordrd"
                    minLength={6} maxLength={50}
                    error={errorsDoublePassword}
                    helpText={
                        <span>
              Пароли не совпадают
            </span>
                    }
                />
                {errorsPassword &&
                <span>Длина пароля минимум 6 знаков</span>

                }
                <Button submit>Регистрация</Button>
            </FormLayout>
        </Form>
                <a href="http://0.0.0.0:81/login" className="block__link-registration">Вход</a>
            </div>
        </div>

    );


