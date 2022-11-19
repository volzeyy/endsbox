import React from "react";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

import { useUserStore } from "../../stores/userStore";

function SignOutButton({className}) {
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
    <button className={className} onClick={handleSignOut}>
      Sign Out
    </button>
  );
}

export default SignOutButton;
