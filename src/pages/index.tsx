import React from "react";
import { useSession, signIn, signOut } from "next-auth/client";
import Map from "../components/map";
import StreetMap from "../components/streetmap";
import { GetStaticProps } from "next";

export function Login() {
  const [session, loading] = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  );
}

type HomeProps = {
  googleMapsApiKey: string;
};

export default function Home({ googleMapsApiKey }: HomeProps) {
  return (
    <>
      <Login />
      <Map googleMapsApiKey={googleMapsApiKey} />
      <StreetMap googleMapsApiKey={googleMapsApiKey} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  };
};
