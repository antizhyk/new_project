import React, {useCallback, useState} from 'react';
import {Button, TextField, Checkbox, Form, FormLayout} from '@shopify/polaris';
import axios from "axios";

export default function Search() {
    const [value, setValue] = useState('');

    const handleSubmit = useCallback((_event) => {
        let searchValue = _event.target.querySelector('#search').value;
        axios.post('api/search', {
            name: 'name',
                search: searchValue
            })
            .then(data => console.log(data.data))
            .catch(error => console.log(error))
        setValue('');
    }, []);


    const handleChange = useCallback(newValue => setValue(newValue), []);

    return (
        <div className='block__search'>
            <Form onSubmit={handleSubmit}>
                <FormLayout>
                    <TextField  value={value} onChange={handleChange} inputMode="search" maxLength={50} minLength={4} name="search" id="search" placeholder="Search..." />
                    <Button submit>Search</Button>
                </FormLayout>
            </Form>
        </div>

    );
}
