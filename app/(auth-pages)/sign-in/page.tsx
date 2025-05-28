import { signInAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import {
  Anchor,
  Box,
  Button,
  Center,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import Link from 'next/link';

export default async function Login(
  props: Readonly<{ searchParams: Promise<Message> }>
) {
  const searchParams = await props.searchParams;
  return (
    <Center>
      <form>
        <Title order={1}>Sign in</Title>
        <Text>
          Don't have an account?{' '}
          <Anchor component={Link} href="/sign-up">
            Sign up
          </Anchor>
        </Text>
        <Flex direction="column" gap="md" mt="md">
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            withAsterisk
            name="email"
            type="email"
            autoComplete="email"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            withAsterisk
            name="password"
            autoComplete="current-password"
          />
          <Box>
            <Anchor component={Link} href="/forgot-password" size="sm">
              Forgot Password?
            </Anchor>
          </Box>

          <Button formAction={signInAction} type="submit">
            Sign in
          </Button>
          <FormMessage message={searchParams} />
        </Flex>
      </form>
    </Center>
  );
}
