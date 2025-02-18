"use client";

import { store } from '@/store/menu-store';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';


const theme = {
    token: {
        colorPrimary: '#7828c8',
        borderRadius: 6,
        fontFamily: 'var(--font-sans)',
    },
};

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ConfigProvider theme={theme}>
                {children}
            </ConfigProvider>
        </Provider>
    );
}
