import React from 'react'

import styles from "./index.module.css"

import GoogleIcon from "@mui/icons-material/Google"

function SignInButton() {

  const handleSignInWithGoogle = () => {
    console.log("google")
  }

  return (
    <button className={styles.signInBtn} onClick={handleSignInWithGoogle}>
      <span>Sign-In with</span><GoogleIcon sx={{ fontSize: 18 }} />
    </button>
  )
}

export default SignInButton