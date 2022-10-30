import React from 'react'

import styles from "./index.module.css"

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerLink}>Privacy Policy</p>
      <p className={styles.footerLink}>©2022 eternebox</p>
      <p className={styles.footerLink}>Terms of Use</p>
    </footer>
  )
}

export default Footer