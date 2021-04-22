import React, {useCallback, useState} from 'react';
import {Button, TextField, Form, FormLayout, Select} from '@shopify/polaris';


export default function FormWithoutNativeValidationExample() {
    const [name, setName] = useState('');
    const [selected, setSelected] = useState('tablet');
    const [textFieldValue, setTextFieldValue] = useState('');
    const [color, setColor] = useState('');
    const [weight, setWeight] = useState('');
    const [sim, setSim] = useState('');
    const [video, setVideo] = useState('');
    //========State-validation==========================
    const [nameVal, setNameVal] = useState('');
    const [priceVal, setPriceVal] = useState('');
    const [colorVal, setColorVal] = useState('');
    const [weightVal, setWeightVal] = useState('');
    const [videoVal, setVideoVal] = useState('');
    const [simVal, setSimVal] = useState('');
    //==================================================
    //========Select-contetnt===========================
    const options = [
        {label: 'tablet', value: 'tablet'},
        {label: 'laptop', value: 'laptop'},
        {label: 'smartphone', value: 'smartphone'},
    ];

    //==================================================
    //=======Контент=======================
    function content (cont){
        return (
            <div className='block__form-wrap'>
                <div className='block__product'>
                    <Form noValidate id="sendProduct" onSubmit={handleSubmit}>
                        <FormLayout>
                            <TextField
                                value={name}
                                onChange={handleUrlChange}
                                label="Имя продукта"
                                type="text"
                                name="name"
                                error={nameVal}
                                onBlur={handleValidUrlChange}
                            />
                            <Select
                                label="Тип продукта"
                                options={options}
                                onChange={handleSelectChange}
                                value={selected}
                                name="type"
                            />
                            <TextField
                                label="Цена"
                                type="number"
                                value={textFieldValue}
                                onChange={handleTextFieldChange}
                                prefix="$"
                                name="price"
                                error={priceVal}
                                onBlur={handleValidTextFieldChange}
                            />
                            <TextField
                                label="Вес"
                                type="number"
                                value={weight}
                                onChange={handleWeightChange}
                                suffix='kg'
                                name="weight"
                                error={weightVal}
                                onBlur={handleValidWeightChange}
                            />
                            <TextField
                                label="Цвет"
                                type="text"
                                value={color}
                                onChange={handleColorChange}
                                name="color"
                                error={colorVal}
                                onBlur={handleValidColorChange}
                            />
                            {cont}
                            <Button submit>Занести в базу</Button>
                        </FormLayout>
                    </Form>
                </div>
            </div>
        );
    }
    //==================================================
    //=======События при отправке=======================
    const handleSubmit = useCallback((_event) => {
        _event.preventDefault();
        const formId = _event.target;
        const formData = new FormData(formId);
        let countField = 0;
        for(let pair of formData.entries()){
            console.log(typeof pair[1]);
            if(pair[1] === ''){
                countField++;
            }
        }
        if(countField > 0){
            alert('Заполните все поля')
        }
       }, []);
    //==================================================
    //=======События при изменение форм=================
    const handleSelectChange = useCallback((value) => setSelected(value), []);
    const handleUrlChange = useCallback((value) => setName(value), []);
    const handleTextFieldChange = useCallback((value) => setTextFieldValue(value),[],);
    const handleColorChange = useCallback((value) => setColor(value),[],);
    const handleWeightChange = useCallback((value) => setWeight(value),[],);
    const handleSimChange = useCallback((value) => setSim(value), []);
    const handleVideoChange = useCallback((value) => setVideo(value), []);
    //==================================================
    //=======События валидации=================
    const handleValidSelectChange = useCallback((value) => setSelected(value), []);
    const handleValidUrlChange = useCallback((value) => {
        if(!value.target.value.match(/^.{1,4}$/)){
            setNameVal("Максимальная длина 50 символов")
            count++;
        }else{
            setNameVal("");
            count--;}}, []);
    const handleValidTextFieldChange = useCallback((value) => {
        if(!value.target.value.match(/^.{1,4}$/)){
            setPriceVal("Максимальная длина 10 символов ")
            count++;
        }else{
            setPriceVal("")
            count--}
       },[],);
    const handleValidColorChange = useCallback((value) => {
        if(!value.target.value.match(/^([a-z]|[A-Z]){1,4}$/)){
            setColorVal("Максимальная длина 50 символов")
            count++;
        }else{
            setColorVal("")
            count--}},[],);
    const handleValidWeightChange = useCallback((value) => {
        if(!value.target.value.match(/^.{1,4}$/)){
            setWeightVal("Максимальная длина 10 символов ")
            count++;
        }else{
            setWeightVal("")
            count--}},[],);
    const handleValidSimChange = useCallback((value) => {
        if(!value.target.value.match(/^.?$/)){
            setSimVal("Максимальная длина 1 символ ")
            count++;
        }else{
            setSimVal("")
            count--}}, []);
    const handleValidVideoChange = useCallback((value) => {
        if(!value.target.value.match(/^.{1,4}$/)){
            setVideoVal("Максимальная длина 50 символов")
            count++;
        }else{
            setVideoVal("")
            count--}
    }, []);
    //==================================================
    //=======Сим и видео поля=================
    const contentSim = <TextField
        label="Количество сим-карт"
        type="number"
        value={sim}
        onChange={handleSimChange}
        name="sim"
        error={simVal}
        onBlur={handleValidSimChange}
    />;
    const contentVideo = <TextField
        label="Видеокарта"
        type="text"
        value={video}
        onChange={handleVideoChange}
        name="video"
        error={videoVal}
        onBlur={handleValidVideoChange}
    />;
    //==================================================
    if(selected === 'tablet'){
        return (
            content()
        );
    }else if(selected === 'laptop'){
        return (
            content(contentVideo)
        );
    }else if(selected === 'smartphone'){
        return (
            content(contentSim)
        );

    }

}
