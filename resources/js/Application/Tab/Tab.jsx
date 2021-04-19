import React, {useCallback, useState} from 'react';
import {Card, Tabs} from '@shopify/polaris';

export default function Tab() {
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );
    const Position = {
        padding: "10px 20px",
        textAlign: "center",
        color: "white",
        fontSize: "22px"
    }
    const styles = {
        Position: Position,
    }
    const tabs = [
        {
            id: 'all-customers-1',
            content: 'All',
            accessibilityLabel: 'All customers',
            panelID: 'all-customers-content-1',
        },
        {
            id: 'accepts-marketing-1',
            content: 'Accepts marketing',
            panelID: 'accepts-marketing-content-1',
        },
    ];

    return (
        <div style={{position: 'relative', minHeight: '200%', width: '100%'}}>
            <div style={{ top: '0'}}>
            <Card >
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} >
                    <Card.Section style = {styles.ErrorMessage} title={tabs[selected].content}>
                        <p>Tab {selected} selected</p>
                    </Card.Section>
                </Tabs>
            </Card>
            </div>
        </div>

    );
}
