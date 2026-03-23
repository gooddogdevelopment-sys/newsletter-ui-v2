import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { cookies } from 'next/headers';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dev Newsletter',
  description: 'Daily coding newsletter archive',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const hasKey = cookieStore.has('newsletter_api_key');

  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-gray-50 min-h-screen">
        <AppRouterCacheProvider>
          {hasKey ? (
            <>
              <Header />
              <main>{children}</main>
            </>
          ) : (
            <LoginForm />
          )}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
