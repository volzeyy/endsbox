import React from "react";
import Link from "next/link";

import { auth, db } from "../../firebase/firebaseClient";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useUserStore } from "../../stores/userStore";

import GoogleIcon from "@mui/icons-material/Google";
import { createCheckoutSession } from "../../stripe/createCheckoutSession";

const DropDown = ({ className, user, userIsPremium }) => {
  const provider = new GoogleAuthProvider();

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const loggedInUser = res.user;
        useUserStore.getState().logInUser(loggedInUser);

        const docRef = doc(db, "users", loggedInUser.uid);
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

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        useUserStore.getState().signOutUser();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handlePremiumSubscribe = () => {
    createCheckoutSession(user.uid)
  }

  return (
    <div className={className}>
      {user ? (
        <>
          <div className='dropdown-header'>
            <img
              src={user.photoURL}
              alt='User Profile Image'
              referrerPolicy='no-referrer'
            />
            <div className='user-info-container'>
              <p className='user-display-name'>{user.displayName}</p>
              <p className='user-username'>
                @{user.username ? user.username : "NoUsername"}
              </p>
            </div>
          </div>
          <div className='dropdown-body'>
            {!userIsPremium && user?.username ?
              <div className="go-premium" onClick={handlePremiumSubscribe}>
                <p>Get Early Access 📀</p>
              </div>
            : userIsPremium && user?.username ?
              <div className="premium-status">
                <p>You are PREMIUM!! 📀</p>
              </div>
            : null}
            <div className='sign-out' onClick={handleSignOut}>
              <p>Sign Out</p>
            </div>
          </div>
        </>
      ) : (
        <div className='log-in' onClick={handleSignInWithGoogle}>
          <p>
            Log-In with Google <GoogleIcon sx={{ fontSize: 18 }} />
          </p>
        </div>
      )}
    </div>
  );
};

export default DropDown;
