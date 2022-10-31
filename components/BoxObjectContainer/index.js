import React, { Fragment, useState } from 'react'

function BoxObjectContainer({ boxPositionX, boxPositionY, boxObjects, setBoxObjects, boxObject, currentAction, boxScale, children }) {
  
  const [isCanDrag, setIsCanDrag] = useState(false)
  const [isCanDelete, setIsCanDelete] = useState(false)
  const [isCanResize, setIsCanResize] = useState(false)
  const [tempObjectPositionX, setTempObjectPositionX] = useState(boxObject.positionX) // - later optimize these 2 too
  const [tempObjectPositionY, setTempObjectPositionY] = useState(boxObject.positionY) // -
  const [tempObjectWidth, setTempObjectWidth] = useState(boxObject.width) // - and these 2
  const [tempObjectHeight, setTempObjectHeight] = useState(boxObject.height) // -

  const onMouseDown = () => {
    if (currentAction === "select") {
      setIsCanDrag(true)
      return
    }

    if (currentAction === "delete") {
      setIsCanDelete(true)
    }

    if (currentAction === "resize") {
      setIsCanResize(true)
    }
  }

  const dragObject = (e) => {
    if (isCanDrag) {
      setTempObjectPositionX(prev => prev += Math.round(e.movementX * (1 / boxScale)))
      setTempObjectPositionY(prev => prev += Math.round(e.movementY * (1 / boxScale)))
    }
  }

  const dragObjectEnd = () => {
    setIsCanDrag(false)
    const newState = boxObjects.map(object => {
      if (object.id === boxObject.id) {
        return {...object, 
          positionX: tempObjectPositionX, 
          positionY: tempObjectPositionY
        }
      }
      return object
    })

    setBoxObjects(newState)
  }

  const deleteObject = () => {
    if (currentAction === "delete") {
        const newState = boxObjects.filter(object => {
            return object.id !== boxObject.id
        })

        setBoxObjects(newState)
    }
  }

  const deleteObjectEnd = () => {
    setIsCanDelete(false)
  }

  const resizeObject = (e) => {
    if (isCanResize) {
      setTempObjectWidth(prev => prev += Math.round((e.movementX * 2) * (1 / boxScale)))
      setTempObjectHeight(prev => prev += Math.round((e.movementY * 2) * (1 / boxScale)))
    }
  }

  const resizeObjectEnd = () => {
    setIsCanResize(false)

    const newState = boxObjects.map(object => {
        if (object.id === boxObject.id) {
            return {...object,
              width: tempObjectWidth,
              height: tempObjectHeight,
            }
        }
        return object
    })

    setBoxObjects(newState)
  }

  return (
    <Fragment>
      <div
        onMouseDown={onMouseDown}
        style={{
          position: "absolute",
          userSelect: "none",
          width: boxObject.width * boxScale,
          height: boxObject.height * boxScale,
          transform: `translate(${(boxObject.positionX * boxScale) + boxPositionX}px, ${(boxObject.positionY * boxScale) + boxPositionY}px)`,
        }}
      >
        {children}
      </div>
      {isCanDrag ?
        <div 
          onMouseMove={dragObject}
          onMouseUp={dragObjectEnd}
          onMouseOut={dragObjectEnd}
          style={{
            position: "absolute",
            zIndex: boxObjects.length + 1,
            width: boxObject.width * boxScale,
            height: boxObject.height * boxScale,
            backgroundColor: "rgba(0, 146, 255, 0.43)",
            transform: `translate(${(tempObjectPositionX * boxScale) + boxPositionX}px, ${(tempObjectPositionY * boxScale) + boxPositionY + 28}px)` // 28 is the height of the navBar, yeah, I'll fix it
          }}
        />
      : isCanDelete ?
        <div 
          onMouseUp={deleteObject}
          onMouseOut={deleteObjectEnd}
          style={{
            position: "absolute",
            zIndex: boxObjects.length + 1,
            width: boxObject.width * boxScale,
            height: boxObject.height * boxScale,
            backgroundColor: "rgba(255, 10, 20, 0.43)",
            transform: `translate(${(boxObject.positionX * boxScale) + boxPositionX}px, ${(boxObject.positionY * boxScale) + boxPositionY + 28}px)`
          }}
        />
      : isCanResize ?
        <div 
          onMouseMove={resizeObject}
          onMouseUp={resizeObjectEnd}
          onMouseOut={resizeObjectEnd}
          style={{
            position: "absolute",
            zIndex: boxObjects.length + 1,
            width: tempObjectWidth * boxScale,
            height: tempObjectHeight * boxScale,
            backgroundColor: "rgba(255, 146, 0, 0.4)",
            transform: `translate(${(boxObject.positionX * boxScale) + boxPositionX}px, ${(boxObject.positionY * boxScale) + boxPositionY + 28}px)`
          }}
        />
      : null}
    </Fragment>
  )
}

export default BoxObjectContainer