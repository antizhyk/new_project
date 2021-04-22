import React, {useCallback, useState} from 'react';
import {Card, Tabs} from '@shopify/polaris';
import ListProduct from './productList/ListProduct';
import AddProduct from "./addProduct/AddProduct";
import FormsRegister from "./Form/FormsRegister";

export default function Warehouse() {
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    const tabs = [
        {
            id: 'productList',
            content: 'Список товаров',
            accessibilityLabel: 'All customers',
            panelID: 'all-customers-content-1',
        },
        {
            id: 'addProduct',
            content: 'Добавить товар',
            panelID: 'accepts-marketing-content-1',
        },
    ];
    const select = (id) =>{
        if(id === 'productList'){
            return <ListProduct/> ;
        }else if(id === 'addProduct'){
            return <AddProduct/>
        }}
    return (
        <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                <Card.Section title={tabs[selected].content}>
                    {
                        select(tabs[selected].id)
                    }
                </Card.Section>

            </Tabs>
            <a href="http://0.0.0.0:81/logout" className="block__logout">logout</a>
        </Card>
    );
}
