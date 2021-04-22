import React from 'react';
import {Card, DataTable, Page} from '@shopify/polaris';

export default function DataTableExample() {
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
