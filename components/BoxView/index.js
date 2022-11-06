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

  useEffect(() => {
    document.body.style.backgroundImage = box.background.image
    document.body.style.backgroundColor = box.background.color
    document.body.style.backgroundRepeat = box.background.repeat
    document.body.style.backgroundBlendMode = box.background.blendMode
    document.body.style.backgroundSize = box.background.size
    document.body.style.backgroundPosition = "center"
    document.body.style.backgroundPositionX = `${box.background.position.x}px`
    document.body.style.backgroundPositionY = `${box.background.position.y}px`
  }, [box.background])

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
      <PropertyBar 
        box={box}
        setBox={setBox}
      />
    </div>
  )
}

export default BoxView