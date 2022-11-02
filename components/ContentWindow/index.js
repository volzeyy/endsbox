import React from 'react'

import styles from "./index.module.css"

function ContentWindow({children}) {
  return (
    <div className={styles.contentWindow}>
        <div className={styles.content}>
            {children}
        </div>
    </div>
  )
}

export default ContentWindow