import { signUpAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import {
  Anchor,
  Button,
  Center,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import Link from 'next/link';

export default async function Signup(
  props: Readonly<{
    searchParams: Promise<Message>;
  }>
) {
  const searchParams = await props.searchParams;
  if ('message' in searchParams) {
    return (
      <div>
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <Center>
      <form>
        <Title order={1}>Sign up</Title>
        <Text>
          Already have an account?{' '}
          <Anchor component={Link} href="/sign-in">
            Sign in
          </Anchor>
        </Text>
        <Flex direction="column" gap="md" mt="md">
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            name="email"
            type="email"
            autoComplete="email"
            withAsterisk
          />
          <PasswordInput
            label="Password"
            type="password"
            placeholder="Your password"
            minLength={8}
            required
            name="password"
            withAsterisk
            autoComplete="new-password"
          />
          <Button formAction={signUpAction} type="submit">
            Sign up
          </Button>
          <FormMessage message={searchParams} />
        </Flex>
      </form>
    </Center>
  );
}
