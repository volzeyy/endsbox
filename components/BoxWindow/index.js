import React, { useEffect, useState } from 'react'

import styles from "./index.module.css"

import BoxObjectContainer from "../BoxObjectContainer"

function BoxWindow({ currentAction, boxObjects, setBoxObjects, boxScale, boxPositionX, setBoxPositionX, boxPositionY, setBoxPositionY }) {

  // I only later realized that I didn't return anything from the .map function, so nothing appeared
  const [isCanDragBox, setIsCanDragBox] = useState(false)

  const onMouseDown = () => {
    if (currentAction == "pan") {
        setIsCanDragBox(true)
    }
  }

  const dragBox = (e) => {
    if (isCanDragBox) {
        setBoxPositionX(prev => prev += e.movementX)
        setBoxPositionY(prev => prev += e.movementY)
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
        {boxObjects.map(boxObject => {
            return (
                <BoxObjectContainer
                    key={boxObject.id}
                    boxScale={boxScale}
                    currentAction={currentAction}
                    boxPositionX={boxPositionX}
                    boxPositionY={boxPositionY}
                    boxObjects={boxObjects}
                    setBoxObjects={setBoxObjects}
                    boxObject={boxObject}
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