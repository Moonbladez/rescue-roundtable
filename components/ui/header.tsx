import { AppShell, Flex, Text } from '@mantine/core';

export const Header = () => {
  return (
    <AppShell.Header px="md" bg="blue">
      <Flex align="center" justify="space-between" h="100%">
        <Text>Rescue Roundtable</Text>
      </Flex>
    </AppShell.Header>
  );
};
