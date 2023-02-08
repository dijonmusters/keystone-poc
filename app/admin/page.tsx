import "server-only";

import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function AdminPage() {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.app_metadata?.keystone?.is_admin) {
    redirect("/public");
  }

  return (
    <>
      <h1>Admin</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}
