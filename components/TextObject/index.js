import React, { Fragment, useState, useEffect } from 'react'

import styles from "./index.module.css"

import { useToolStore } from "../../stores/toolStore"

function TextObject({ 
  boxObject,
  box,
  setBox,
}) {
  
  const selectedTool = useToolStore((state) => state.selectedTool)

  const [isToolUsed, setIsToolUsed] = useState({
    drag: false,
    delete: false,
  })

  const [tempObject, setTempObject] = useState({
    position: {
      x: boxObject.position.x,
      y: boxObject.position.y,
    },
  })

  useEffect(() => {
    const text = document.getElementById(boxObject.id)
    
    const newState = box.objects.map(object => {
    if (object.id === boxObject.id) {
      return {...object,
        width: text.clientWidth * ( 1 / box.scale ),
        height: text.clientHeight * ( 1 / box.scale ),
      }
    }

    return object
    })

  setBox(prev => {
    return {...prev,
      objects: newState,
    }
  })

  }, [])

  const onMouseDown = () => {
    if (selectedTool === "select") {
      setIsToolUsed(prev => {
        return {...prev,
          drag: true,
        }
      })
    }

    if (selectedTool === "delete") {
      setIsToolUsed(prev => {
        return {...prev,
          delete: true,
        }
      })
    }
  }

  const dragObject = (e) => {
    if (isToolUsed.drag) {
      setTempObject(prev => {
        return {...prev,
          position: {
            x: prev.position.x + Math.round(e.movementX * (1 / box.scale)),
            y: prev.position.y + Math.round(e.movementY * (1 / box.scale)),
          }
        }
      })
    }
  }

  const dragObjectEnd = () => {
    setIsToolUsed(prev => {
      return {...prev,
        drag: false,
      }
    })

    if (tempObject.position.x === boxObject.position.x && tempObject.position.y === boxObject.position.y) {
      setBox(prev => {
        return {...prev,
          selectedObjectId: boxObject.id
        }
      })

      return
    }

    const newState = box.objects.map(object => {
      if (object.id === boxObject.id) {
        return {...object,
          position: {
            x: tempObject.position.x,
            y: tempObject.position.y,
          }
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
    if (isToolUsed.delete) {
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
    setIsToolUsed(prev => {
      return {...prev,
        delete: false,
      }
    })
    setBox(prev => {
      return {...prev,
        selectedObjectId: ""
      }
    })
  }

  return (
    <Fragment>
      <div
        onMouseDown={onMouseDown}
        id={boxObject.id}
        style={{
          outline: `${boxObject.id === box.selectedObjectId ? "2px dotted blue" : ''}`,
          position: "absolute",
          userSelect: "none",
          transform: `translate(${(boxObject.position.x * box.scale) + box.position.x}px, ${(boxObject.position.y * box.scale) + box.position.y}px)`,
        }}
      >
        <h1>Text</h1>
      </div>
      {isToolUsed.drag ?
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
            transform: `translate(${(tempObject.position.x * box.scale) + box.position.x}px, ${(tempObject.position.y * box.scale) + box.position.y}px)` //  is the height of the navBar, yeah, I'll fix it
          }}
        />
      : isToolUsed.delete ?
        <div 
          onMouseUp={deleteObject}
          onMouseOut={deleteObjectEnd}
          style={{
            position: "absolute",
            zIndex: box.objects.length + 1,
            width: boxObject.width * box.scale,
            height: boxObject.height * box.scale,
            backgroundColor: "rgba(255, 10, 20, 0.43)",
            transform: `translate(${(boxObject.position.x * box.scale) + box.position.x}px, ${(boxObject.position.y * box.scale) + box.position.y}px)`
          }}
        />
      : null }
    </Fragment>
  )
}

export default TextObject