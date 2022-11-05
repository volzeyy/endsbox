import React, { Fragment, useState } from 'react'

import MediaObject from '../MediaObject'

function BoxObjectContainer({ 
  currentAction, 
  boxObject,
  box,
  setBox,
}) {
  
  const [isAction, setIsAction] = useState({
    drag: false,
    delete: false,
    resize: false,    
  })

  const [tempObject, setTempObject] = useState({
    position: {
      x: boxObject.position.x,
      y: boxObject.position.y,
    },
    width: boxObject.width,
    height: boxObject.height,
  })

  const onMouseDown = () => {
    if (currentAction === "select") {
      setIsAction(prev => {
        return {...prev,
          drag: true,
        }
      })
    }

    if (currentAction === "delete") {
      setIsAction(prev => {
        return {...prev,
          delete: true,
        }
      })
    }

    if (currentAction === "resize") {
      setIsAction(prev => {
        return {...prev,
          resize: true,
        }
      })
    }
  }

  const dragObject = (e) => {
    if (isAction.drag) {
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
    setIsAction(prev => {
      return {...prev,
        drag: false,
      }
    })

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
    if (isAction.delete) {
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
    setIsAction(prev => {
      return {...prev,
        delete: false,
      }
    })
  }

  const resizeObject = (e) => {
    if (isAction.resize) {
      setTempObject(prev => {
        return {...prev,
          width: prev.width + Math.round((e.movementX * 2) * (1 / box.scale)),
          height: prev.height + Math.round((e.movementY * 2) * (1 / box.scale))
        }
      })
    }
  }

  const resizeObjectEnd = () => {
    setIsAction(prev => {
      return {...prev,
        resize: false,
      }
    })

    const newState = box.objects.map(object => {
        if (object.id === boxObject.id) {
            return {...object,
              width: tempObject.width,
              height: tempObject.height,
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
          transform: `translate(${(boxObject.position.x * box.scale) + box.position.x}px, ${(boxObject.position.y * box.scale) + box.position.y}px)`,
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
      {isAction.drag ?
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
      : isAction.delete ?
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
      : isAction.resize ?
        <div 
          onMouseMove={resizeObject}
          onMouseUp={resizeObjectEnd}
          onMouseOut={resizeObjectEnd}
          style={{
            position: "absolute",
            zIndex: box.objects.length + 1,
            width: tempObject.width * box.scale,
            height: tempObject.height * box.scale,
            backgroundColor: "rgba(255, 146, 0, 0.4)",
            transform: `translate(${(boxObject.position.x * box.scale) + box.position.x}px, ${(boxObject.position.y * box.scale) + box.position.y}px)`
          }}
        />
      : null}
    </Fragment>
  )
}

export default BoxObjectContainer