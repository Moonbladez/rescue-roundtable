'use client';

import { Tables } from '@/database.types';
import { createClient } from '@/utils/supabase/client';
import { Alert, Anchor, Table } from '@mantine/core';
import { LockKeyholeIcon, PinIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const TopicTable = () => {
  const supabase = createClient();
  const [topics, setTopics] = useState<Tables<'topics'>[]>([]);
  const [error, setError] = useState<any>(null);
  const params = useParams<{ forumId: string }>();
  const forumId = params.forumId;

  useEffect(() => {
    const fetchTopics = async () => {
      const { data, error } = await supabase
        .from('topics')
        .select(
          `
          *,
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

  console.log('Fetched topics:', topics);

  return (
    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Replies</th>
          <th>Last Post</th>
        </tr>
      </thead>
      <tbody>
        {topics.map((topic) => (
          <tr key={topic.id}>
            <td>
              {topic.is_sticky && <PinIcon color="gold" />}
              {topic.is_locked && <LockKeyholeIcon color="red" />}
              <Anchor
                href={`/topics/${topic.id}`}
                component={Link}
                underline="never"
              >
                {topic.title}
              </Anchor>
            </td>
            <td>{topic.profiles.email}</td>
            <td>Replies total</td>
            <td>Latest Reply</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
