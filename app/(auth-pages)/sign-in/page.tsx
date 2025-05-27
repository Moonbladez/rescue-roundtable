import { signInAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import { Button, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import Link from 'next/link';

export default async function Login(
  props: Readonly<{ searchParams: Promise<Message> }>
) {
  const searchParams = await props.searchParams;
  return (
    <form>
      <Title order={1}>Sign in</Title>
      <Text>
        Don't have an account? <Link href="/sign-up">Sign up</Link>
      </Text>
      <div>
        <TextInput
          label="Email"
          placeholder="you@example.com"
          required
          withAsterisk
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          withAsterisk
        />
        <div>
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>

        <Button formAction={signInAction}>Sign in</Button>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
