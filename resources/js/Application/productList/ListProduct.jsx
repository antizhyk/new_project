import React, { Fragment, useEffect, useState } from 'react';
import {Card, DataTable, Page} from '@shopify/polaris';
import axios from "axios";

export default function DataTableExample() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function fetch() {
            const data = await axios.get("/api/products");
            setProducts(data.data);
        }

        fetch();

    }, []);

    const rows = [
        ['Emerald Silk Gown', 'Laptop', '$875.00', 124689, 'red', '-', 'IntelHD 4000'],
        ['Mauve Cashmere Scarf', 'Tablet', '$230.00', 124533, 'green', '-', '-'],
        [
            'Navy Merino Wool Blazer with khaki chinos and yellow belt',
            'Smartfone',
            '$445.00',
            124518,
            'balck',
            '2',
            '-',
        ],
    ];
    for(let item in products){
        console.log(products[item]);
        let arr = [products[item].Name,
            products[item].Type.name,
            products[item].Price,
            products[item].Weight,
            products[item].Color,
            products[item].Dualsim,
            products[item].Videocard]
        console.log(arr);
        rows.push(arr);
    }
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
        </Page>
    );
}
