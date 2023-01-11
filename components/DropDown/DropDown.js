import React from "react";

import { auth, db } from "../../firebase/firebaseClient";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useUserStore } from "../../stores/userStore";

import GoogleIcon from "@mui/icons-material/Google";
import { createCheckoutSession } from "../../stripe/createCheckoutSession";

const DropDown = ({ className, user }) => {
  const provider = new GoogleAuthProvider();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        useUserStore.getState().signOutUser();
      })
      .catch((error) => {
        alert(error);
      });
  };

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
            <div className='sign-out' onClick={handleSignOut}>
              <p>Sign Out</p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DropDown;
