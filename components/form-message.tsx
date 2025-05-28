import { Text } from '@mantine/core';

export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: Readonly<{ message: Message }>) {
  return (
    <div>
      {'success' in message && <Text c="green">{message.success}</Text>}
      {'error' in message && <Text c="red">{message.error}</Text>}
      {'message' in message && <Text c="dimmed">{message.message}</Text>}
    </div>
  );
}
