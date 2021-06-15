import React from 'react';
import {
  useSession, signIn, signOut
} from 'next-auth/client'

export function Login() {
  const [ session, loading ] = useSession();

  if(session) {
    return <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }
  return <>
    Not signed in <br/>
    <button onClick={() => signIn('google')}>Sign in</button>
  </>
}

export default function Home() {
  return (
    <Login />
  )
}
