import React from 'react';
import useForm from "react-hook-form";
import "./form.css";


export  default function FormsRegister(){
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) =>{
        console.log(data);
    }

    return(
        <div className={'form__block'}>
            <form className={'form__wrap'} onSubmit={handleSubmit(onSubmit)}>
                <input className={'form__input'} type="text" placeholder="Email" name="email" ref={register}
                       ref={register({required: true, pattern: /^\w*@\w{2,7}\.\w{2,7}/, maxLength: 50})}/>
                <input className={'form__input'} type="password" placeholder="Password" name='password'
                       ref={register({required: true, minLength: 6, maxLength: 50})}
                />
                {errors.email && <p>Email is invalid</p>}
                {errors.password && <p>Password is invalid</p>}
                <input className={'form__input'} type="submit" value={"Зарегистрироваться"}/>
            </form>
        </div>
    );
}
