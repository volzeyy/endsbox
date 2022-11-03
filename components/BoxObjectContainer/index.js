import React, { Fragment, useState } from 'react'

import MediaObject from '../MediaObject'

function BoxObjectContainer({ 
  currentAction, 
  boxObject,
  box,
  setBox,
}) {
  
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
      setTempObjectPositionX(prev => prev += Math.round(e.movementX * (1 / box.scale)))
      setTempObjectPositionY(prev => prev += Math.round(e.movementY * (1 / box.scale)))
    }
  }

  const dragObjectEnd = () => {
    setIsCanDrag(false)
    const newState = box.objects.map(object => {
      if (object.id === boxObject.id) {
        return {...object,
          positionX: tempObjectPositionX, 
          positionY: tempObjectPositionY
        }
      }
      return object
    })

    setBox(prev => {
      return {...prev,
        objects: newState,
      }
    })
  }

  const deleteObject = () => {
    if (currentAction === "delete") {
        const newState = box.objects.filter(object => {
            return object.id !== boxObject.id
        })

        setBox(prev => {
          return {...prev,
            objects: newState,
          }
        })
    }
  }

  const deleteObjectEnd = () => {
    setIsCanDelete(false)
  }

  const resizeObject = (e) => {
    if (isCanResize) {
      setTempObjectWidth(prev => prev += Math.round((e.movementX * 2) * (1 / box.scale)))
      setTempObjectHeight(prev => prev += Math.round((e.movementY * 2) * (1 / box.scale)))
    }
  }

  const resizeObjectEnd = () => {
    setIsCanResize(false)

    const newState = box.objects.map(object => {
        if (object.id === boxObject.id) {
            return {...object,
              width: tempObjectWidth,
              height: tempObjectHeight,
            }
        }
        return object
    })

    setBox(prev => {
      return {...prev,
        objects: newState,
      }
    })
  }

  return (
    <Fragment>
      <div
        onMouseDown={onMouseDown}
        style={{
          position: "absolute",
          userSelect: "none",
          width: boxObject.width * box.scale,
          height: boxObject.height * box.scale,
          transform: `translate(${(boxObject.positionX * box.scale) + box.position.x}px, ${(boxObject.positionY * box.scale) + box.position.y}px)`,
        }}
      >
        {boxObject.type === "media" ? 
          <MediaObject 
            mediaSrc={boxObject.src}
          />
        :
          null
        }
      </div>
      {isCanDrag ?
        <div 
          onMouseMove={dragObject}
          onMouseUp={dragObjectEnd}
          onMouseOut={dragObjectEnd}
          style={{
            position: "absolute",
            zIndex: box.objects.length + 1,
            width: boxObject.width * box.scale,
            height: boxObject.height * box.scale,
            backgroundColor: "rgba(0, 146, 255, 0.43)",
            transform: `translate(${(tempObjectPositionX * box.scale) + box.position.x}px, ${(tempObjectPositionY * box.scale) + box.position.y}px)` //  is the height of the navBar, yeah, I'll fix it
          }}
        />
      : isCanDelete ?
        <div 
          onMouseUp={deleteObject}
          onMouseOut={deleteObjectEnd}
          style={{
            position: "absolute",
            zIndex: box.objects.length + 1,
            width: boxObject.width * box.scale,
            height: boxObject.height * box.scale,
            backgroundColor: "rgba(255, 10, 20, 0.43)",
            transform: `translate(${(boxObject.positionX * box.scale) + box.position.x}px, ${(boxObject.positionY * box.scale) + box.position.y}px)`
          }}
        />
      : isCanResize ?
        <div 
          onMouseMove={resizeObject}
          onMouseUp={resizeObjectEnd}
          onMouseOut={resizeObjectEnd}
          style={{
            position: "absolute",
            zIndex: box.objects.length + 1,
            width: tempObjectWidth * box.scale,
            height: tempObjectHeight * box.scale,
            backgroundColor: "rgba(255, 146, 0, 0.4)",
            transform: `translate(${(boxObject.positionX * box.scale) + box.position.x}px, ${(boxObject.positionY * box.scale) + box.position.y}px)`
          }}
        />
      : null}
    </Fragment>
  )
}

export default BoxObjectContainer