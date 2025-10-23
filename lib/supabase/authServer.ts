import { createClient } from "./server";




// Sign up
export async function signUp(email: string, password: string) {
    console.log(supabase);
  return  supabase.auth.signUp({ email, password });
}

// Sign in
export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

// Sign out
export async function signOut() {
  return supabase.auth.signOut();
}

export async function getSession() {
  const supabase = await createClient();
  return await supabase.auth.getSession();
}

export async function getUser() {
  const supabase = await createClient();
  return await supabase.auth.getUser();
}

export async function signInWithGoogle() {
    const supabase = await createClient();
    console.log(`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`);
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });
}