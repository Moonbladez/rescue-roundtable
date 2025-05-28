import { Breadcrumb } from '@/components/ui/breadcrumb';
import { createClient } from '@/utils/supabase/server';
import { Card, Flex, Stack } from '@mantine/core';

export default async function TopicPage({
  params,
}: Readonly<{
  params: Promise<{ topicId: string; categoryId: string; forumId: string }>;
}>) {
  const supabase = await createClient();
  const { topicId, categoryId, forumId } = await params;

  const { data: posts } = await supabase
    .from('posts')
    .select(`*`)
    .order('created_at', { ascending: true })
    .eq('topic_id', topicId);

  const breadcrumbItems = [
    { title: 'Home', href: '/' },
    { title: 'Categories', href: '/categories' },
    {
      title: 'Forums',
      href: `/categories/${categoryId}/forums/${forumId}`,
    },
    {
      title: 'Topics',
      href: `/categories/${categoryId}/forums/${forumId}/topics/${topicId}`,
    },
  ];

  return (
    <Flex direction="column" gap="lg">
      <Breadcrumb items={breadcrumbItems} />

      <Stack>
        {posts && posts.length > 0
          ? posts.map((post) => (
              <Card withBorder key={post.id}>
                {post.content}
              </Card>
            ))
          : null}
      </Stack>
    </Flex>
  );
}
