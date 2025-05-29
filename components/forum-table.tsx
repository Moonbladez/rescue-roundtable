'use client';

import { Tables } from '@/database.types';
import { Accordion, Anchor, Flex, Table, Text } from '@mantine/core';
import Link from 'next/link';

export type CategoryWithForums = Tables<'categories'> & {
  forums: Tables<'forums'>[];
};

interface ForumTableProps {
  categories: CategoryWithForums[];
}
export const ForumTable = ({ categories }: ForumTableProps) => {
  return (
    <Accordion
      variant="separated"
      multiple
      defaultValue={categories.map((c) => c.id)}
    >
      {categories.map((category) => (
        <Accordion.Item key={category.id} value={category.id}>
          <Accordion.Control>{category.name}</Accordion.Control>
          <Accordion.Panel>
            <Table
              key={category.id}
              stickyHeader
              withRowBorders={false}
              highlightOnHover
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th></Table.Th>
                  <Table.Th>Topics</Table.Th>
                  <Table.Th>Posts</Table.Th>
                  <Table.Th>Last Post</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {category.forums.map((forum) => (
                  <Table.Tr key={forum.id}>
                    <Table.Td>
                      <Flex direction="column" gap={2}>
                        <Anchor
                          component={Link}
                          href={`/categories/${category.id}/forums/${forum.id}`}
                          underline="hover"
                          fw="bold"
                          size="sm"
                        >
                          {forum.name}
                        </Anchor>
                        {forum.description && (
                          <Text size="xs" c="dimmed" lineClamp={2}>
                            {forum.description}
                          </Text>
                        )}
                      </Flex>
                    </Table.Td>
                    <Table.Td>topics t</Table.Td>
                    <Table.Td>posts total</Table.Td>
                    <Table.Td>last post</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
