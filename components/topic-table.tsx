'use client';

import { Tables } from '@/database.types';
import { createClient } from '@/utils/supabase/client';
import { Alert, Anchor, Table, Text } from '@mantine/core';
import { LockKeyholeIcon, PinIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TopicsWithPostsAndProfiles extends Tables<'topics'> {
  posts: Tables<'posts'>[];
  profiles: Tables<'profiles'>;
}

export const TopicTable = () => {
  const supabase = createClient();
  const [topics, setTopics] = useState<TopicsWithPostsAndProfiles[]>([]);
  const [error, setError] = useState<any>(null);
  const params = useParams<{ forumId: string; categoryId: string }>();
  const forumId = params.forumId;
  const categoryId = params.categoryId;

  useEffect(() => {
    const fetchTopics = async () => {
      const { data, error } = await supabase
        .from('topics')
        .select(
          `
          *,
          posts(*),
          profiles (*)
          `
        )
        .eq('forum_id', forumId)
        // sticky=true first, then sticky=false
        .order('is_sticky', { ascending: false })
        // within each group, oldest → newest
        .order('created_at', { ascending: true });
      if (error) {
        setError(error);
      } else {
        setTopics(data || []);
      }
    };
    fetchTopics();
  }, [supabase]);

  if (error) {
    console.error('Error fetching topics:', error);
    return <Alert color="red">Error loading topics</Alert>;
  }

  return (
    <Table withRowBorders={true}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Title</Table.Th>
          <Table.Th>Author</Table.Th>
          <Table.Th>Replies</Table.Th>
          <Table.Th>Last Post</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {topics.map((topic) => (
          <Table.Tr key={topic.id}>
            <Table.Td>
              {topic.is_sticky && <PinIcon color="gold" />}
              {topic.is_locked && <LockKeyholeIcon color="red" />}
              <Anchor
                href={`/categories/${categoryId}/forums/${forumId}/topics/${topic.id}`}
                component={Link}
                underline="never"
              >
                {topic.title}
              </Anchor>
            </Table.Td>
            <Table.Td>{topic.profiles.email}</Table.Td>
            <Table.Td>{topic.posts.length - 1}</Table.Td>
            <Table.Td>
              {topic.posts[1]?.created_at ?? (
                <Text c="dimmed" size="sm">
                  No replies yet
                </Text>
              )}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
