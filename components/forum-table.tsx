'use client';

import { Anchor, Flex, Table, Text } from '@mantine/core';
import NextLink from 'next/link';

interface Forum {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  topics: number;
  posts: number;
  lastPost: string;
}

interface Category {
  id: string;
  name: string;
  forums: Forum[];
}

export const ForumTable = ({ categories }: { categories: Category[] }) => {
  return (
    <>
      {categories.map((category) => {
        const rows = category.forums.map((forum) => (
          <Table.Tr key={forum.id}>
            <Table.Td>
              <Flex direction="column" gap={2}>
                <Anchor
                  component={NextLink}
                  href={`/forum/${forum.slug}`}
                  underline="hover"
                  fw="bold"
                  size="sm"
                >
                  {forum.name}
                </Anchor>
                {forum.description && (
                  <Text size="xs" c="dimmed">
                    {forum.description}
                  </Text>
                )}
              </Flex>
            </Table.Td>
            <Table.Td>{forum.topics}</Table.Td>
            <Table.Td>{forum.posts}</Table.Td>
            <Table.Td>{forum.lastPost}</Table.Td>
          </Table.Tr>
        ));

        return (
          <Table
            key={category.id}
            stickyHeader
            withRowBorders={false}
            withTableBorder
            highlightOnHover
            mb="xl"
          >
            <Table.Thead>
              <Table.Tr>
                {/* now shows the real category name */}
                <Table.Th>{category.name}</Table.Th>
                <Table.Th>Topics</Table.Th>
                <Table.Th>Posts</Table.Th>
                <Table.Th>Last Post</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        );
      })}
    </>
  );
};
