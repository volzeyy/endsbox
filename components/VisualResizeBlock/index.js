import React from "react";
import { runTransaction, doc } from "firebase/firestore";
import { db } from "../../firebase";

const VisualResizeBlock = ({
  box,
  setBox,
  boxObject,
  tempObject,
  setTempObject,
  setIsToolUsed,
  isSandbox,
}) => {
  const resizeObject = (e) => {
    setTempObject((prev) => {
      return {
        ...prev,
        width: prev.width + Math.round(e.movementX * 2 * (1 / box.scale)),
        height: prev.height + Math.round(e.movementY * 2 * (1 / box.scale)),
      };
    });
  };

  const resizeObjectEnd = () => {
    setIsToolUsed((prev) => {
      return { ...prev, resize: false };
    });

    if (
      boxObject.width === tempObject.width &&
      boxObject.height === tempObject.height
    ) {
      return;
    }

    const newState = box.objects.map((object) => {
      if (object.id === boxObject.id) {
        return {
          ...object,
          width: tempObject.width,
          height: tempObject.height,
        };
      }
      return object;
    });
    const oldState = box.objects;

    setBox((prev) => {
      return { ...prev, objects: newState };
    });

    if (!isSandbox) {
      console.log("saveeeeeeeeeeeeeeeeee resizeeeeeeeeeeeeeee");
      const saveScale = async () => {
          runTransaction(db, async (transaction) => {
            const objectRef = doc(db, "objects", boxObject.id);
            const objectDoc = await transaction.get(objectRef);
            if (objectDoc.exists()) {
              transaction.update(objectRef, {
                width: tempObject.width,
                height: tempObject.height,
              })
            }
          }).then(() => {
            console.log("success")
          }).catch(() => {
            setTempObject(prev => {
              return {...prev,
                width: boxObject.width,
                height: boxObject.height,
              }
            })
            setBox(prev => {
              return {...prev, objects: oldState} 
            })
          })
      };
      saveScale();
    };
  };

  return (
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
        transform: `translate(${
          boxObject.position.x * box.scale + box.position.x
        }px, ${boxObject.position.y * box.scale + box.position.y}px)`,
      }}
    />
  );
};

export default VisualResizeBlock;
