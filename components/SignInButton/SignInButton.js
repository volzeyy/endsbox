import React from "react";

import GoogleIcon from "@mui/icons-material/Google";

import { auth, db } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useUserStore } from "../../stores/userStore";

function SignInButton({ className }) {
  const provider = new GoogleAuthProvider();

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const user = res.user;
        useUserStore.getState().logInUser(user);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          useUserStore.getState().setUsername(data.username);
        }
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        alert(`Error ${errorCode}: ${errorMessage}`);
      });
  };

  return (
    <button className={className} onClick={handleSignInWithGoogle}>
      <span>Sign-In with</span>
      <GoogleIcon sx={{ fontSize: 18 }} />
    </button>
  );
}

export default SignInButton;
