import { ReactNode } from 'react';
import { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/providers/providers';
import Layout from '@/components/layout/layout';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-plus-jakarta-sans',
});

export const metadata: Metadata = {
    title: {
        template: '%s | Menu App',
        default: 'Menu App - Discover Great Food'
    },
    description: 'Explore our delicious menu items and place your order with ease',
    keywords: ['menu', 'food', 'restaurant', 'ordering', 'dining'],
    authors: [{ name: 'Menu App Team' }],
    creator: 'Menu App',
    publisher: 'Menu App',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    icons: {
        icon: '/favicon.ico',
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning >
            <body className={cn(plusJakartaSans.className, "min-h-screen antialiased")}>
                <Providers>
                    <Layout>{children}</Layout>
                </Providers>
            </body>
        </html>
    );
}

