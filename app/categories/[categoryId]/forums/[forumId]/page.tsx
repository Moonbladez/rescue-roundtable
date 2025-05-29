import { TopicTable } from '@/components/topic-table';
import { createClient } from '@/utils/supabase/server';
import { Alert, Button, Flex, Stack, Text, Title } from '@mantine/core';
import { Plus } from 'lucide-react';

export default async function ForumPage({
  params,
}: Readonly<{
  params: Promise<{ categoryId: string; forumId: string }>;
}>) {
  const supabase = await createClient();
  const { forumId } = await params;

  const { data: forums, error } = await supabase
    .from('forums')
    .select(`name, description, id`)
    .eq('id', forumId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching forum:', error);
    return (
      <Flex direction="column" gap="lg">
        <Text>Failed to load forum</Text>
      </Flex>
    );
  }

  if (!forums || forums.length === 0) {
    return <Alert color="red">Forum not found</Alert>;
  }

  return (
    <Flex direction="column" gap="lg">
      <Stack>
        <Title>{forums[0].name}</Title>
        {forums[0].description && (
          <Text c="dimmed" size="sm">
            {forums[0].description}
          </Text>
        )}
      </Stack>
      {/* /// TODO: only if logged in */}
      <Flex>
        <Button
          color="gray"
          leftSection={<Plus size={14} />}
          size="xs"
          variant="outline"
        >
          New Post
        </Button>
      </Flex>

      <TopicTable />
    </Flex>
  );
}
