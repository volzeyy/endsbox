import React, { useEffect, useState } from 'react'

import styles from "./index.module.css"

import BoxObjectContainer from "../BoxObjectContainer"

function BoxWindow() {

  // I only later realized that I didn't return anything from the .map function, so nothing appeared
  const [boxObjects, setBoxObjects] = useState([
    {
        id: 0,
        positionX: 3,
        positionY: -4,
        width: 745,
        height: 76,
        index: 0
    },
    {
        id: 1,
        positionX: 400,
        positionY: -10,
        width: 745,
        height: 76,
        index: 1
    }
  ])
  const [boxScale, setBoxScale] = useState(0.4)
  const [boxPositionX, setBoxPositionX] = useState(0)
  const [boxPositionY, setBoxPositionY] = useState(0)
  const [currentAction, setCurrentAction] = useState("resize") // for test, "pan", "select", "delete", "resize"... All work
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

  // add types to the boxObjects object, like
  // {...object, type: media} or {...object, type: text}
  // and then render here accordingly

  return (
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
                >
                    <h1>Hello World!</h1>
                </BoxObjectContainer>
            )
        })}
    </div>
  )
}

export default BoxWindow