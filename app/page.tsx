'use client'

import { getSession, getUser, signIn, signInWithGoogle, signOut, signUp } from '@/lib/supabase/auth';

import { useState } from 'react';
export default function Home() {
  console.log(getUser())
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState("");

  const handleSignUp = async () => {
    console.log(email, password);
    const { data, error } = await signUp(email, password);
    if (error){
      alert(error.message);
      console.log(error);
    }
    else setUser(data.user);
  };

  const handleSignIn = async () => {
    const { data, error } = await signIn(email, password);
    if (error) alert(error.message);
    setUser(data.user);
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <div className='flex flex-col'>
      <input  value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignOut}>Sign Out</button>
      <button onClick={() => signInWithGoogle()}>Sign In with Google</button>
      {user && <div>Signed in as: {user.email}</div>}
    </div>
  );
}
