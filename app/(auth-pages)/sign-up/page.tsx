import { signUpAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import { Button, PasswordInput, TextInput, Title } from '@mantine/core';
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
    <form>
      <Title order={1}>Sign up</Title>
      <p>
        Already have an account? <Link href="/sign-in">Sign in</Link>
      </p>
      <div>
        <TextInput label="Email" placeholder="you@example.com" required />
        <PasswordInput
          label="Password"
          type="password"
          placeholder="Your password"
          minLength={8}
          required
        />
        <Button formAction={signUpAction}>Sign up</Button>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
