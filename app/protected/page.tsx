import { createClient } from '@/utils/supabase/server';
import { InfoIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  return (
    <div>
      <div>
        <div>
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div>
        <h2>Your user details</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <div>
        <h2>Next steps</h2>
        <p>
          Now that you're authenticated, you can start fetching data from the
          API.
        </p>
      </div>
    </div>
  );
}
