import { signOutAction } from '@/app/actions';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import { createClient } from '@/utils/supabase/server';
import { Button, Pill } from '@mantine/core';
import Link from 'next/link';

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <div>
        <div>
          <Pill variant={'default'}>
            Please update .env.local file with anon key and url
          </Pill>
        </div>
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
  return user ? (
    <div>
      Hey, {user.email}!
      <form action={signOutAction}>
        <Button type="submit" variant={'outline'}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div>
      <Button size="sm" variant={'outline'}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button size="sm" variant={'default'}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
