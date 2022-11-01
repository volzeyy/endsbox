import React from 'react'

import styles from "./index.module.css"

function MediaObject({mediaSrc}) {
  return (
    <img draggable="false" className={styles.mediaObject} src={mediaSrc}/>
  )
}

export default MediaObject