import React, { Fragment, useEffect, useState } from 'react';
import {Card, DataTable, Page, Pagination} from '@shopify/polaris';
import axios from "axios";
//import {Pagination} from 'react-laravel-paginex'

export default function DataTableExample() {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(1);

    useEffect(() => {
        async function fetch() {
            const data = await axios.get("/api/products/");
            console.log(data)
            setProducts(data.data);
        }

        fetch();

    }, []);

    //console.log(products.length)
    const movePage = () => {
        axios.get('/api/products/?page=' + count)
            .then(response => setProducts(response.data))
    }


    const rows = [];
    for(let item in products){
        let arr = [products[item].Name,
            products[item].Type.name,
            products[item].Price,
            products[item].Weight,
            products[item].Color,
            products[item].Dualsim,
            products[item].Videocard]
        rows.push(arr);
    }

    console.log(products);

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
                        ]}
                        headings={[
                            'Product',
                            'ProductType',
                            'Price',
                            'Weight',
                            'Color',
                            'number of sim',
                            'videocard',
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
                            setCount(count - 1)
                        }
                        console.log(count)
                        movePage()
                        console.log('Previous');

                    }}
                    hasNext
                    onNext={() => {
                        setCount(count + 1)
                        console.log(count)
                        movePage()
                        console.log('Next');
                    }}
                />
            </div>

        </Page>
    );
}
