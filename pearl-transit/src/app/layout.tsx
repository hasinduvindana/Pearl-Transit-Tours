// app/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
//import Splash from '../components/Splash';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pearl Transit Tours & Travels',
  description: 'Official site for Pearl Transit Tours & Travels',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        {/* Splash sits above content and will hide itself when finished */}
        
        <div id="main-content" className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
