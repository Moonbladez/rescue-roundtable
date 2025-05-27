import { resetPasswordAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import { Button, PasswordInput, Text, Title } from '@mantine/core';

export default async function ResetPassword(
  props: Readonly<{
    searchParams: Promise<Message>;
  }>
) {
  const searchParams = await props.searchParams;
  return (
    <form>
      <Title order={1}>Reset password</Title>
      <Text>Please enter your new password below.</Text>
      <PasswordInput label="New password" placeholder="New password" required />
      <PasswordInput
        label="Confirm password"
        placeholder="Confirm password"
        required
      />

      <Button formAction={resetPasswordAction}>Reset password</Button>
      <FormMessage message={searchParams} />
    </form>
  );
}
