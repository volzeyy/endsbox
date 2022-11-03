import React, { useEffect, useState } from 'react'

import styles from "./index.module.css"

import BoxObjectContainer from "../BoxObjectContainer"

function BoxWindow({ 
  currentAction, 
  box, 
  setBox 
}) {

  const [isCanDragBox, setIsCanDragBox] = useState(false)

  const onMouseDown = () => {
    if (currentAction == "pan") {
        setIsCanDragBox(true)
    }
  }

  const dragBox = (e) => {
    if (isCanDragBox) {
        setBox(prev => {
          return {...prev,
            position: {
              x: prev.position.x += e.movementX,
              y: prev.position.y += e.movementY,
            },
          }
        })
    }
  }

  const dragBoxEnd = () => {
    setIsCanDragBox(false)
  }

  return (
    <div className={styles.boxViewContainer}>
      <div className={styles.boxWindow}
        onMouseDown={onMouseDown}
        onMouseMove={dragBox}
        onMouseUp={dragBoxEnd}
      >
        {box.objects.map(boxObject => {
            return (
              <BoxObjectContainer
                key={boxObject.id}
                currentAction={currentAction}
                boxObject={boxObject}
                box={box}
                setBox={setBox}
              />
            )
        })}
      </div>
      {currentAction === "customize-box" ?
        <div className={styles.propertyWindow}>
          Hello
        </div>
      : null}
    </div>
  )
}

export default BoxWindow