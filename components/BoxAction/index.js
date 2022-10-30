import React, { useState } from 'react'

import styles from "./index.module.css"

// add tooltip too ( maybe use z-index too )
// and change background, color on active
function BoxAction({
   children, 
   ...otherEvents
}) {

  return (
    <div className={styles.actionContainer} >
      <label className={`${styles.action} ${styles.default}`} {...otherEvents}>
        {children}
      </label>
    </div>
  )
}

export default BoxAction