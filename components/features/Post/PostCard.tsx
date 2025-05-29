'use client';

import { Tables } from '@/database.types';
import { Card, Flex, Grid, Text } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Tables<'posts'> & {
    profiles: Tables<'profiles'>;
  };
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card withBorder key={post.id} variant="filled">
      <Grid>
        <Grid.Col span={2}>{post.profiles?.email}</Grid.Col>
        <Grid.Col span={10}>
          <Flex direction="column" gap="xs">
            <Text flex={1}>{post.content}</Text>

            <Text c="dimmed" size="xs">
              Posted on {dayjs(post.created_at).format('MMMM D, YYYY HH:mm a')}{' '}
              - {dayjs(post.created_at).fromNow()}
            </Text>
          </Flex>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
