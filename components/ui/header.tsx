import { AppShell, Flex, Text } from '@mantine/core';
import { ThemeToggle } from './theme-toggle';

export const Header = () => {
  return (
    <AppShell.Header px="md" bg="blue">
      <Flex align="center" justify="space-between" h="100%">
        <Text c="white">Rescue Roundtable</Text>
        <ThemeToggle />
      </Flex>
    </AppShell.Header>
  );
};
