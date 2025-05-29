import { ForumTable } from '@/components/forum-table';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { createClient } from '@/utils/supabase/server';
import { Alert, Flex, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { TriangleAlertIcon } from 'lucide-react';

export default async function Home() {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from('categories')
    .select(
      `
      *,
      forums(*)
    `
    )
    .order('sort_order', {
      referencedTable: 'forums',
      ascending: true,
    });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching categories:', error);
    return (
      <Alert
        title="Error fetching categories"
        color="red"
        icon={<TriangleAlertIcon size={30} />}
      >
        {error.message || 'An error occurred while fetching categories.'}
      </Alert>
    );
  }

  return (
    <Flex direction="column" gap="lg">
      <div>navbar and notifications</div>
      <Breadcrumb items={[{ title: 'Home', href: '/' }]} />
      <Flex justify="space-between" align="center">
        <Text component="span" c="dimmed" size="xs">
          It is currently {dayjs().format('MMMM D, YYYY HH:mm a')}
        </Text>
        {user ? (
          <Text component="span" c="dimmed" size="xs">
            Logged in as:
            <Text span fw="bold" ml={2}>
              {user.email}
            </Text>
          </Text>
        ) : (
          <Text component="span" c="dimmed" size="xs">
            You are not logged in
          </Text>
        )}
      </Flex>

      <ForumTable categories={categories ?? []} />
    </Flex>
  );
}
