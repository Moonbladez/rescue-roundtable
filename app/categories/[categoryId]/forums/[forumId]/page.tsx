import { createClient } from '@/utils/supabase/server';
import { Anchor, Flex, Stack, Text, Title } from '@mantine/core';

export default async function ForumPage({
  params,
}: Readonly<{
  params: Promise<{ categoryId: string; forumId: string }>;
}>) {
  const supabase = await createClient();
  const { forumId, categoryId } = await params;

  const { data: forums } = await supabase
    .from('forums')
    .select(`*, topics(*)`)
    .order('created_at', { ascending: false })
    .eq('id', forumId);

  if (!forums || forums.length === 0) {
    return (
      <Flex direction="column" gap="lg">
        <Text>Forum not found</Text>
      </Flex>
    );
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

      <Stack>
        {forums[0].topics.map((topic) => (
          <Anchor
            key={topic.id}
            href={`/categories/${categoryId}/forums/${forumId}/topics/${topic.id}`}
          >
            {topic.title}
          </Anchor>
        ))}
      </Stack>
    </Flex>
  );
}
