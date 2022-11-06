import React, { useEffect, useState } from 'react'

import styles from "./index.module.css"

import ObjectContainer from '../ObjectContainer'

import { useToolStore } from "../../stores/toolStore"
import PropertyBar from '../PropertyBar'

function BoxView({ 
  box, 
  setBox 
}) {

  const selectedTool = useToolStore((state) => state.selectedTool)

  const [isCanDragBox, setIsCanDragBox] = useState(false)

  const onMouseDown = () => {
    if (selectedTool == "pan") {
        setIsCanDragBox(true)
    }
  }

  const dragBox = (e) => {
    if (isCanDragBox) {
        setBox(prevBox => {
          return {...prevBox,
            position: {
              x: prevBox.position.x + e.movementX,
              y: prevBox.position.y + e.movementY,
            },
          }
        })
    }
  }

  const dragBoxEnd = () => {
    setIsCanDragBox(false)
  }

  const boxObjects = box.objects.map(object => {
    return (
      <ObjectContainer 
        key={object.id}
        boxObject={object}
        box={box}
        setBox={setBox}
      />
    )
  })

  return (
    <div className={styles.mainContainer}>
      <div className={styles.boxView}
          onMouseDown={onMouseDown}
          onMouseMove={dragBox}
          onMouseUp={dragBoxEnd}
      >
        {boxObjects}
      </div>
      {selectedTool === "customize-box" ?
        <PropertyBar>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
        </PropertyBar>
      : null}
    </div>
  )
}

export default BoxView