import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Card, DataTable, Page, Pagination, Button, TextField, Form, FormLayout} from '@shopify/polaris';
import axios from "axios";
import {Link} from "react-router-dom";
import { Redirect, useParams } from "react-router-dom";


export default function DataTableExample() {
    const [products, setProducts] = useState();
    const [count, setCount] = useState(1);
    const [value, setValue] = useState('');
    const [data, setData] = useState();
    const [status, setStatus] = useState(true);
    const { id } = useParams();
    let arr = [];
    let rows = [];
    //=======================Заполнение массива контентом==============================
    // const divStyle = {
    //     backgroundСolor: 'hsl(60,100%,25%)',
    // };
    //==================================================================================
//=======================Заполнение массива контентом==============================
    useEffect(()=>{
        rows=[];
        console.log(products)
        for(let item in products){
            let arr = [products[item].Name,
                products[item].Type.name,
                products[item].Price,
                products[item].Weight,
                products[item].Color,
                products[item].Dualsim,
                products[item].Videocard,
                <button onClick={deleteProduct} value={products[item].Id}>Delete</button>,
            ]
            rows.push(arr);
        }
        console.log(status)

       // setTimeout(()=>console.log(rows), 1000);
    }, [products])
//==================================================================================
// =======================Получение всех продуктов==============================

        useEffect(() => {
            if(status === true){
                (async()=> {
                    const data = await axios.get("/api/products/?page=1");
                    setProducts(data.data);
                })()
            }
        }, [status]);


//==================================================================================
// ===Если продукт найден то переписывает масссив продуктов=========================
    useEffect(()=>{
        if(data){
            setStatus(false);
            arr.push(data)
            setProducts(arr);
        }else{
            console.log('und')
        }

}, [data])
//==================================================================================
// =======================Поиск продукта==============================
    const handleSubmit = useCallback((_event) => {
        event.preventDefault();
        let searchValue = _event.target.querySelector('#search').value;
        (async()=> {
            await axios.post('api/search', {
            search: searchValue
        })
            .then(response => {
                setData(response.data)
                    })
            .catch(error => console.log(error))
        setValue('');
        })()

    }, []);
//==================================================================================
// =======================Переключение страниц==============================
    const handleChange = useCallback(newValue => setValue(newValue), []);
    const movePage = () => {
        async function fetch() {
            const data = await axios.get("/api/products/?page=" + (count + 1));
            if(data.data.length >= 1){
                setProducts(data.data);
                setCount(count + 1)
            }
        }
        fetch();


    }

    const prevMovePage = () => {

        async function fetch() {
            const data = await axios.get("/api/products/?page=" + (count - 1));
            setProducts(data.data);
        }
        fetch();
        setCount(count - 1)
    }

//==================================================================================
//==========Experement======================
    async function deleteProduct(e) {
        // setLoading(true);
        console.log(e.target.value)
        let id = e.target.value;
        const res = await axios({
            method: "delete",
            url: `/api/products/` + id,
        })
            .then(response => location.reload());
        res();
        // success("Successfully deleted item");
        // setRedirect(true);
        // setLoading(false);
    }
//===========================================
    //products[item].Color
    for(let item in products){
        let arr = [products[item].Name,
            products[item].Type.name,
            products[item].Price,
            products[item].Weight,
            <div className='block__color-wrapper'><div className='block__color' style={{backgroundColor: 'hsl(100,100%,25%)'}}></div></div>,
            products[item].Dualsim,
            products[item].Videocard,
            <button onClick={deleteProduct} value={products[item].Id}>Delete</button>,
        ]
        rows.push(arr);
    }
    return (
        <div>
        <div className='block__search'>
            <Form onSubmit={handleSubmit}>
                <FormLayout>
                    <TextField  value={value} onChange={handleChange} inputMode="search" maxLength={50} minLength={4} name="search" id="search" placeholder="Search..." />
                    <Button submit>Search</Button>
                </FormLayout>
            </Form>
        </div>
        <Page title="Products list">
            <Card>
                <div className="block__table">
                    <DataTable
                        columnContentTypes={[
                            'text',
                            'text',
                            'numeric',
                            'numeric',
                            'React.ReactNode',
                            'text',
                            'text',
                            'React.ReactNode'
                        ]}
                        headings={[
                            'Название продукта',
                            'Тип продукта',
                            'Цена в ($)',
                            'Вес в грамах',
                            'Цвет',
                            'Количество сим карт',
                            'Наличие видеокарт',
                        ]}
                        rows={rows}
                        verticalAlign="center"
                    />

                </div>
            </Card>
            <div className="block__paginate">
                <Pagination
                    hasPrevious
                    onPrevious={() => {
                         if(count > 1){
                             prevMovePage()
                         }
                        console.log('Previous');

                    }}
                    hasNext
                    onNext={() => {
                        movePage()
                        console.log('Next');
                    }}
                />
            </div>

        </Page>
        </div>
    );
}
