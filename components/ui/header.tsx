import { Anchor, AppShell, Flex, Text } from '@mantine/core';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export const Header = () => {
  return (
    <AppShell.Header px="md" bg="blue">
      <Flex align="center" justify="space-between" h="100%">
        <Anchor component={Link} href="/" size="sm" underline="never">
          <Text c="white">Rescue Roundtable</Text>
        </Anchor>
        <ThemeToggle />
      </Flex>
    </AppShell.Header>
  );
};
