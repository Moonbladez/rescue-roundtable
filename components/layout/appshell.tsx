'use client';

import { AppShell, Flex, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { Header } from '../ui/header';

export const CustomAppShell = ({ children }: { children: ReactNode }) => {
  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      padding={{ base: 10, sm: 15, lg: 'xl' }}
      withBorder={false}
    >
      <Header />

      <AppShell.Main>{children}</AppShell.Main>

      <AppShell.Footer px="md">
        <Flex align="center" justify="center" h="100%">
          <Text size="xs" c="dimmed">
            © 2025 Rescue Roundtable
          </Text>
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
};
