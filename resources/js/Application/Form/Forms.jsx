import React from 'react';
import useForm from "react-hook-form";


export  default function Forms(){
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) =>{
        console.log(data);
    }

    return(
      <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Email" name="email" ref={register}/>
          <input type="password" placeholder="Password" name='password'
                 ref={register({required: true, minLength: 2, pattern: /sasha/})}
              />
          {errors.password && <p>Password is invalid</p>}
          <input type="submit"/>
      </form>
    );
}
