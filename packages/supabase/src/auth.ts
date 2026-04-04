import type { SupabaseClient, User, Session } from "@supabase/supabase-js";

export async function getSession(
  client: SupabaseClient
): Promise<Session | null> {
  const { data } = await client.auth.getSession();
  return data.session;
}

export async function getUser(client: SupabaseClient): Promise<User | null> {
  const { data } = await client.auth.getUser();
  return data.user;
}

export async function signOut(client: SupabaseClient): Promise<void> {
  await client.auth.signOut();
}
