import React from 'react';
import {AppProvider, Frame, TopBar} from '@shopify/polaris';


export default function Header() {
    const logo = (
        <span className={'logo'}>
            Logo
        </span>
    )
    const topBarMarkup = (
        <TopBar
            logo={logo}
        />
    );

    return (
        <div style={{height: '250px'}}>
            <AppProvider
                i18n={{
                    Polaris: {
                        Avatar: {
                            label: 'Avatar',
                            labelWithInitials: 'Avatar with initials {initials}',
                        },
                        Frame: {skipToContent: 'Skip to content'},
                        TopBar: {
                            toggleMenuLabel: 'Toggle menu',
                            SearchField: {
                                clearButtonLabel: 'Clear',
                                search: 'Search',
                            },
                        },
                    },
                }}
            >

                <Frame topBar={topBarMarkup}
                />
            </AppProvider>
        </div>
    );
}
