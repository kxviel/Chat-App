import Head from "next/head";
import firebase from "firebase/app";
import { myFireauth } from "../services/Firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ChatScreen from "../components/ChatScreen";
import Landing from "../components/Landing";

export default function Home() {
  const [user, setUser] = useState(() => myFireauth.currentUser);
  const [init, setInit] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsuscribe = myFireauth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (init) {
        setInit(false);
      }
    });

    return unsuscribe;
  }, [init]);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    myFireauth.useDeviceLanguage();
    try {
      await myFireauth.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
  };

  if (init) return <div>Loading</div>;
  return (
    <>
      <Head>
        <title>C Y N E F I N</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user ? <ChatScreen /> : <Landing signIn={() => signInWithGoogle} />}
    </>
  );
}
