import React from "react";

import styles from "./index.module.css";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

import { useUserStore } from "../../stores/userStore";

function SignOutButton() {
  const handleSignOut = (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        useUserStore.getState().signOutUser();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <button className={styles.signOutBtn} onClick={handleSignOut}>
      Sign Out
    </button>
  );
}

export default SignOutButton;
