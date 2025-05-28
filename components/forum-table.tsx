'use client';

import { Tables } from '@/database.types';
import { Anchor, Flex, Table, Text } from '@mantine/core';
import NextLink from 'next/link';

export type CategoryWithForums = Tables<'categories'> & {
  forums: Tables<'forums'>[];
};

interface ForumTableProps {
  categories: CategoryWithForums[];
}
export const ForumTable = ({ categories }: ForumTableProps) => {
  return (
    <>
      {categories.map((category) => {
        const rows = category.forums.map((forum) => (
          <Table.Tr key={forum.id}>
            <Table.Td>
              <Flex direction="column" gap={2}>
                <Anchor
                  component={NextLink}
                  href={`/categories/${category.id}/forums/${forum.id}`}
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
            <Table.Td>topics t</Table.Td>
            <Table.Td>posts total</Table.Td>
            <Table.Td>last post</Table.Td>
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
