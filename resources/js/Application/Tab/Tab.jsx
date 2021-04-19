import React, {useCallback, useState} from 'react';
import {Card, Tabs} from '@shopify/polaris';
import Forms from '../Form/Forms'

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
            id: 'enter',
            content: 'Вход',
            accessibilityLabel: 'All customers',
            panelID: 'all-customers-content-1',
        },
        {
            id: 'register',
            content: 'Accepts marketing',
            panelID: 'accepts-marketing-content-1',
        },
    ];
    const select = (id) =>{
        if(id === 'enter'){
            return <Forms/> ;
        }else if(id === 'register'){

        }
    }
    return (
        <div>
            <div style={{ top: '0'}}>
            <Card >
                <div className={'block__tab'}>
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} >

                        <Card.Section  style = {styles.ErrorMessage}>
                            {
                                select(tabs[selected].id)
                            }

                        </Card.Section>

                </Tabs>
                </div>
            </Card>
            </div>
        </div>

    );
}
