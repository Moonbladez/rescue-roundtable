import { ForumTable } from '@/components/forum-table';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { createClient } from '@/utils/supabase/server';
import { Flex, Text } from '@mantine/core';

export default async function Home() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from('categories')
    .select(`*, forums(*)`);

  console.log('Categories:', categories);

  return (
    <Flex direction="column" gap="lg">
      <div>navbar and notifications</div>
      <Breadcrumb items={[{ title: 'Home', href: '/' }]} />
      <Text component="span" c="dimmed" size="xs">
        It is currently{' '}
        {new Date().toLocaleString(undefined, {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
      <Flex direction="column" gap="md">
        <ForumTable categories={categories ?? []} />
      </Flex>
    </Flex>
  );
}
