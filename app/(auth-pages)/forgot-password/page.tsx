import { forgotPasswordAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import { Button, Text, TextInput, Title } from '@mantine/core';

import Link from 'next/link';

export default async function ForgotPassword(
  props: Readonly<{
    searchParams: Promise<Message>;
  }>
) {
  const searchParams = await props.searchParams;
  return (
    <form>
      <div>
        <Title order={1}>Reset Password</Title>
        <Text>
          Already have an account? <Link href="/sign-in">Sign in</Link>
        </Text>
      </div>
      <div>
        <TextInput label="Email" placeholder="you@example.com" required />
        <Button formAction={forgotPasswordAction}>Reset Password</Button>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
