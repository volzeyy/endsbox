import React from "react";

import { auth, db } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useUserStore } from "../../stores/userStore";

import GoogleIcon from "@mui/icons-material/Google";

const DropDown = ({ className, user }) => {
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
      ) : (
        <div className='log-in' onClick={handleSignInWithGoogle}>
          <p>
            Log-In with Google <GoogleIcon sx={{ fontSize: 18 }} />
          </p>
        </div>
      )}
      <div className='legals-container'>
        <p>Content Policy</p>
        <p>Terms</p>
        <p>About</p>
      </div>
    </div>
  );
};

export default DropDown;
