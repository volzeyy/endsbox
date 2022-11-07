import React, {useEffect, useState} from 'react'

import styles from "./index.module.css"

import Logo from '../Logo'
import SignInButton from '../SignInButton'

import { useUserStore } from "../../stores/userStore"
import SignOutButton from '../SignOutButton'

function NavBar() {
  const [isUser, setIsUser] = useState({})

  const user = useUserStore((state) => state.user)

  useEffect(() => {
    setIsUser(user)
  }, [user])

  return (
    <header className={styles.navBar}>
        <Logo />
        {isUser ?
          <SignOutButton />
        :
          <SignInButton />
        }
    </header>
  )
}

export default NavBar