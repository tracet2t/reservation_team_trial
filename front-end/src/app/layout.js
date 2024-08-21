"use client";

import { Provider } from 'react-redux';
import { store } from '../store/store';
import Navbar from '@/components/nav';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Navbar></Navbar>
          {children}
        </Provider>
      </body>
    </html>
  );
}
