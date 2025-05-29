import { PostCard } from '@/components/features/Post/PostCard';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { createClient } from '@/utils/supabase/server';
import { Button, Flex, Stack, Text, Title } from '@mantine/core';

export default async function TopicPage({
  params,
}: Readonly<{
  params: Promise<{ topicId: string; categoryId: string; forumId: string }>;
}>) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const { topicId, categoryId, forumId } = await params;

  const isLoggedInAndAuthenticated: boolean =
    user.user?.user_metadata?.email_verified;

  /// TOPIC OF TITLE AND PROFILE
  const { data: topic } = await supabase
    .from('topics')
    .select(`title, profiles(*)`)
    .eq('id', topicId);

  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select(`*, profiles(*)`)
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
      title: topic && topic.length > 0 ? topic[0].title : 'Topic',
      href: `/categories/${categoryId}/forums/${forumId}/topics/${topicId}`,
    },
  ];

  return (
    <Flex direction="column" gap="lg">
      <Breadcrumb items={breadcrumbItems} />
      <Stack>
        <Title order={1}>
          {topic && topic.length > 0 ? topic[0].title : 'Topic not found'}
        </Title>
        <Text c="dimmed" size="sm">
          {topic && topic.length > 0
            ? `Posted by ${topic[0].profiles.email}`
            : ''}
        </Text>
      </Stack>
      {postsError && (
        <Text c="red" size="sm">
          Error loading posts: {postsError.message}
        </Text>
      )}
      {isLoggedInAndAuthenticated ? (
        <Flex justify="flex-end">
          <Button variant="gradient">Reply</Button>
        </Flex>
      ) : (
        <Text c="dimmed" size="sm">
          You must be logged in to reply to this topic.
        </Text>
      )}
      <Stack>
        {posts && posts.length > 0
          ? posts.map((post) => <PostCard key={post.id} post={post} />)
          : null}
      </Stack>
    </Flex>
  );
}
