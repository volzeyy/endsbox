import React from 'react'

import styles from "./index.module.css"

function TextObject({text}) {
  return (
    <h1 draggable="false" className={styles.textObject}>
        {text}
    </h1>
  )
}

export default TextObject