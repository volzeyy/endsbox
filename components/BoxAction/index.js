import React, { useState } from 'react'

import styles from "./index.module.css"

// add tooltip too ( maybe use z-index too )
// and change background, color on active
function BoxAction({
  actionTip,
  actionId,
  currentAction,
  setCurrentAction,
   children, 
   ...otherEvents
}) {

  const handleActionClick = (e) => {
    if (actionId === "zoom-in" || actionId === "zoom-out") {
      return
    }

    setCurrentAction(actionId)
  }

  return (
    <div className={styles.actionContainer} >
      <div className={styles.actionTip}>
        <p>{actionTip}</p>
      </div>
      <label className={actionId === currentAction ? `${styles.action} ${styles.active}` : `${styles.action} ${styles.default}`} onClick={handleActionClick} {...otherEvents}>
        {children}
      </label>
    </div>
  )
}

export default BoxAction