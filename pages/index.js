import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import UserSignupForm from "../components/UserSignupForm";
import BoxView from "../components/BoxView";
import PropertyBar from "../components/PropertyBar";
import ToolBar from "../components/ToolBar";

import { useUserStore } from "../stores/userStore";

export default function Home() {
  const user = useUserStore((state) => state.user);

  const [box, setBox] = useState({
    owner: "",
    background: {
      position: {
        x: 0,
        y: 0,
      },
    },
    objects: [],
    scale: 0.2,
    position: { x: 0, y: 0 },
    selectedObjectId: "",
  });
  const [isShowUsernameSignup, setIsShowUsernameSignup] = useState(false);

  useEffect(() => {
    console.log(user);
    const fetchUser = async () => {
      if (user && !user.username) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Document data: ", data);
          useUserStore.getState().setUsername(docSnap.data().username);
          setIsShowUsernameSignup(false);
          return;
        }
        setIsShowUsernameSignup(true);
        return;
      }

      setIsShowUsernameSignup(false);
    };

    fetchUser();
  }, [user]);

  return (
    <div className={styles.container}>
      <Head>
        <title>eternebox</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {isShowUsernameSignup ? (
        <UserSignupForm />
      ) : (
        <>
          <BoxView box={box} setBox={setBox} />
          <PropertyBar box={box} setBox={setBox} />
          <ToolBar box={box} setBox={setBox} />
        </>
      )}
    </div>
  );
}
