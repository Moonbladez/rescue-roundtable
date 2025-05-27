import { CustomAppShell } from '@/components/layout/appshell';
import { MantineServerProvider } from '@/components/provider';
import '@mantine/core/styles.css';
import { Geist } from 'next/font/google';
import { ReactNode } from 'react';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Rescue Roundtable',
  description: 'Next.js Supabase Starter',
};

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body>
        <MantineServerProvider>
          <CustomAppShell>{children}</CustomAppShell>
        </MantineServerProvider>
      </body>
    </html>
  );
}
