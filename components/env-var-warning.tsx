import { Button, Pill } from '@mantine/core';
import Link from 'next/link';

export function EnvVarWarning() {
  return (
    <div>
      <Pill variant={'outline'}>Supabase environment variables required</Pill>
      <div>
        <Button size="sm" variant={'outline'} disabled>
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button size="sm" variant={'default'} disabled>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
