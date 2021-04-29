import React, {useCallback, useEffect, useState} from 'react';
import {Button, TextField, Form, FormLayout, Select, ColorPicker, Popover} from '@shopify/polaris';
import axios from "axios";


export default function FormWithoutNativeValidationExample() {
    const [name, setName] = useState('');
    const [selected, setSelected] = useState('1');
    const [price, setPrice] = useState('');
    //const [color, setColor] = useState('');
    const [weight, setWeight] = useState('');
    const [sim, setSim] = useState('');
    const [video, setVideo] = useState('');
    const [color, setColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });

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
        {label: 'Планшет', value: '1'},
        {label: 'Ноутбук', value: '2'},
        {label: 'Смартфон', value: '3'},
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
                                onChange={setName}
                                label="Имя продукта"
                                type="text"
                                name="name"
                                id='nameProduct'
                                error={nameVal}
                                onBlur={handleValidUrlChange}
                            />
                            <Select
                                label="Тип продукта"
                                options={options}
                                onChange={setSelected}
                                value={selected}
                                name="type"
                                id='typeProduct'
                            />
                            <TextField
                                label="Цена"
                                type="number"
                                value={price}
                                onChange={setPrice}
                                prefix="$"
                                name="price"
                                error={priceVal}
                                id='priceProduct'
                                onBlur={handleValidTextFieldChange}
                            />
                            <TextField
                                label="Вес"
                                type="number"
                                value={weight}
                                onChange={setWeight}
                                suffix='гр.'
                                name="weight"
                                id='weightProduct'
                                error={weightVal}
                                onBlur={handleValidWeightChange}
                            />
                            <ColorPicker onChange={setColor} color={color} id='color' />
                            {/*<TextField*/}
                            {/*    label="Цвет"*/}
                            {/*    type="text"*/}
                            {/*    id='colorProduct'*/}
                            {/*    value={color}*/}
                            {/*    onChange={handleColorChange}*/}
                            {/*    name="color"*/}
                            {/*    error={colorVal}*/}
                            {/*    onBlur={handleValidColorChange}*/}
                            {/*/>*/}
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
    const handleSubmit = async (_event) => {
        _event.preventDefault();
        const formId = _event.target;
        const formData = new FormData(formId);
        let countField = 0;
        for(let pair of formData.entries()){
            if(pair[1] === ''){
                countField++;
            }
        }
        if(countField > 0){
            alert('Заполните все поля')
        }else{
            let videocardValueForm = '-';
            let dualsimValueForm = '-';
            let typeValueForm = selected;
            let colorValueForm = Math.round(color.hue) + ', ' + (Math.round(color.brightness * 100)) + '%, ' + (Math.round(color.saturation * 100)) + '%';
            if(typeValueForm === '2'){
                videocardValueForm = video;
            }
            if(typeValueForm === '3'){
                dualsimValueForm = sim;
            }
            try{
                const response =  await axios.post('api/products', {
                    name: name,
                    weight: weight,
                    color: colorValueForm,
                    price: price,
                    dualsim: dualsimValueForm,
                    videocard: videocardValueForm,
                    type_id: selected,
                })

                alert('Продукт успешно добавлен!!!')
                _event.target.reset();
                setName('');
                setPrice('');
                setColor('');
                setWeight('');
                setSim('');
                setVideo('');
            } catch (e) {
                console.log(e)
            }
        }
    };
    //==================================================
    //=======События при изменение форм=================
    // const handleSelectChange = useCallback((value) => {
    //     console.log(value)
    //     setSelected(value)}, []);
    // const handleUrlChange = useCallback((value) => setName(value), []);
    // const handleTextFieldChange = useCallback((value) => setTextFieldValue(value),[],);
    // //const handleColorChange = useCallback((value) => setColor(value),[],);
    // const handleWeightChange = useCallback((value) => setWeight(value),[],);
    // const handleSimChange = useCallback((value) => setSim(value), []);
    // const handleVideoChange = useCallback((value) => setVideo(value), []);
    // const handleChange = useCallback((value) => {
    //     //console.log(document.querySelector('#color'));
    //     console.log(value);
    //     setColor(value);
    //     //console.log(color)
    // }, []);
    //==================================================
    //=======События валидации=================
    const handleValidSelectChange = useCallback((value) => setSelected(value), []);
    const handleValidUrlChange = useCallback((value) => {
        if(!value.target.value.match(/^.{1,50}$/)){
            setNameVal("Максимальная длина 50 символов")
        }else{
            setNameVal("");}}, []);
    const handleValidTextFieldChange = useCallback((value) => {
        if(!value.target.value.match(/^.{1,10}$/)){
            setPriceVal("Максимальная длина 10 символов ");
        }else{
            setPriceVal("")}
    },[],);
    // const handleValidColorChange = useCallback((value) => {
    //     if(!value.target.value.match(/^([a-z]){1,50}$/i)){
    //         setColorVal("Максимальная длина 50 символов")
    //     }else{
    //         setColorVal("")}},[],);
    const handleValidWeightChange = useCallback((value) => {
        if(!value.target.value.match(/^.{1,10}$/)){
            setWeightVal("Максимальная длина 10 символов ")
        }else{
            setWeightVal("")}},[],);
    const handleValidSimChange = useCallback((value) => {
        if(!value.target.value.match(/^.?$/)){
            setSimVal("Максимальная длина 1 символ ")
        }else{
            setSimVal("")}}, []);
    const handleValidVideoChange = useCallback((value) => {
        if(!value.target.value.match(/^.{1,50}$/)){
            setVideoVal("Максимальная длина 50 символов")
        }else{
            setVideoVal("")}
    }, []);
    //==================================================
    //=======Сим и видео поля=================
    const contentSim = <TextField
        label="Количество сим-карт"
        type="number"
        value={simVal}
        onChange={setSimVal}
        id='dualsimProduct'
        name="sim"
        //error={simVal}
        onBlur={handleValidSimChange}
    />;
    const contentVideo = <TextField
        label="Видеокарта"
        type="text"
        value={videoVal}
        id="videocardProduct"
        onChange={setVideoVal}
        name="video"
        error={videoVal}
        onBlur={handleValidVideoChange}
    />;
    //==================================================
    if(selected === '1'){
        return (
            content()
        );
    }else if(selected === '2'){
        return (
            content(contentVideo)
        );
    }else if(selected === '3'){
        return (
            content(contentSim)
        );

    }

}
