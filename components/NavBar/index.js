import React from 'react'

import styles from "./index.module.css"

import Logo from '../Logo'
import SignInButton from '../SignInButton'

function NavBar() {
  return (
    <header className={styles.navBar}>
        <Logo />
        <SignInButton />
    </header>
  )
}

export default NavBar