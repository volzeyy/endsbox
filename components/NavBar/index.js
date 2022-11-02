import React from 'react'

import styles from "./index.module.css"

import Logo from '../Logo'
import SignInButton from '../SignInButton'

import { useUserStore } from "../../stores/userStore"

function NavBar() {

  const user = useUserStore((state) => state.user)

  return (
    <header className={styles.navBar}>
        <Logo />
        {user ? 
          null
        :
          <SignInButton />
        }
    </header>
  )
}

export default NavBar