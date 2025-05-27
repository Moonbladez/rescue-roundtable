'use client';

import { createTheme, MantineProvider } from '@mantine/core';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

interface MantineServerProviderProps {
  children: ReactNode;
}

const theme = createTheme({
  black: '#333333',
});

export function MantineServerProvider({
  children,
}: Readonly<MantineServerProviderProps>) {
  return (
    <ThemeProvider enableSystem={true}>
      <MantineProvider
        withGlobalClasses
        defaultColorScheme="auto"
        theme={theme}
      >
        {children}
      </MantineProvider>
    </ThemeProvider>
  );
}
