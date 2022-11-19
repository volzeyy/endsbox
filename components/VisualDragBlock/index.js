import React, { useState } from "react";

const VisualDragBlock = ({ box, setBox, boxObject, tempObject, setTempObject, setIsToolUsed }) => {
  const dragObject = (e) => {
    setTempObject((prev) => {
      return {
        ...prev,
        position: {
          x: prev.position.x + Math.round(e.movementX * (1 / box.scale)),
          y: prev.position.y + Math.round(e.movementY * (1 / box.scale)),
        },
      };
    });
  };

  const dragObjectEnd = () => {
    setIsToolUsed((prev) => {
      return { ...prev, drag: false };
    });

    if (
      tempObject.position.x === boxObject.position.x &&
      tempObject.position.y === boxObject.position.y
    ) {
      setBox((prev) => {
        return { ...prev, selectedObjectId: boxObject.id };
      });

      return;
    }

    const newState = box.objects.map((object) => {
      if (object.id === boxObject.id) {
        return {
          ...object,
          position: {
            x: tempObject.position.x,
            y: tempObject.position.y,
          },
        };
      }

      return object;
    });

    setBox((prev) => {
      return { ...prev, objects: newState };
    });
  };

  return (
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
        transform: `translate(${
          tempObject.position.x * box.scale + box.position.x
        }px, ${tempObject.position.y * box.scale + box.position.y}px)`, //  is the height of the navBar, yeah, I'll fix it
      }}
    />
  );
};

export default VisualDragBlock;
