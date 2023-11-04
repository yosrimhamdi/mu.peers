import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import './globals.css';
import ReduxProvider from '@/redux/Provider';
import AutoSignIn from './components/AutoSignIn';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mu-Peers',
  description: 'We simplify your peer analysis',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" />
        <ReduxProvider>
          <AutoSignIn>{children}</AutoSignIn>
        </ReduxProvider>
      </body>
    </html>
  );
}
