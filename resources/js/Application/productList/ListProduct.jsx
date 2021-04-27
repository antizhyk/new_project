import React, { Fragment, useEffect, useState } from 'react';
import {Card, DataTable, Page, Pagination} from '@shopify/polaris';
import axios from "axios";
import {Link} from "react-router-dom";
import { Redirect, useParams } from "react-router-dom";


export default function DataTableExample() {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(1);
    const { id } = useParams();
    useEffect(() => {
        async function fetch() {
            const data = await axios.get("/api/products/?page=1");

            setProducts(data.data);
        }

        fetch();

    }, []);

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

    const rows = [];
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
//==========Experement======================
    async function deleteProduct(e) {
        // setLoading(true);
        console.log(e.target.value)
        let id = e.target.value;
        const res = await axios({
            method: "delete",
            url: `/api/products/` + id,
        })
            .then(response => ocation.reload());
        res();
        // success("Successfully deleted item");
        // setRedirect(true);
        // setLoading(false);
    }
//===========================================
    return (

        <Page title="Products list">
            <Card>
                <div className="block__table">
                    <DataTable
                        columnContentTypes={[
                            'text',
                            'text',
                            'numeric',
                            'numeric',
                            'text',
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
    );
}
