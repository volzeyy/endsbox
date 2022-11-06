import React from 'react'

import styles from "./index.module.css"

function PropertyBar({children}) {
  return (
    <div className={styles.propertyBar}>
        {children}
    </div>
  )
}

export default PropertyBar