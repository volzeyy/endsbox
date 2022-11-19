import React, { Fragment, useState, useEffect } from "react";

import { useToolStore } from "../../stores/toolStore";

import Image from "next/image";

import VisualDragBlock from "../VisualDragBlock";
import VisualDeleteBlock from "../VisualDeleteBlock";
import VisualResizeBlock from "../VisualResizeBlock";

function BoxObject({ boxObject, box, setBox }) {
  const selectedTool = useToolStore((state) => state.selectedTool);

  const [isToolUsed, setIsToolUsed] = useState({
    drag: false,
    delete: false,
    resize: false,
  });

  const [tempObject, setTempObject] = useState({
    position: {
      x: boxObject.position.x,
      y: boxObject.position.y,
    },
    width: boxObject.width,
    height: boxObject.height,
  });

  useEffect(() => {
    if (boxObject.type === "text") {
      console.log(boxObject);
      const text = document.getElementById(boxObject.id);

      setTempObject((prev) => {
        return {
          ...prev,
          width: text.clientWidth * (1 / box.scale),
          height: text.clientHeight * (1 / box.scale),
        };
      });

      const newState = box.objects.map((object) => {
        if (object.id === boxObject.id) {
          return {
            width: text.clientWidth * (1 / box.scale),
            height: text.clientHeight * (1 / box.scale),
            ...object,
          };
        }

        return object;
      });

      setBox((prev) => {
        return { ...prev, objects: newState };
      });
    }
  }, []);

  const onMouseDown = () => {
    if (selectedTool === "select") {
      setIsToolUsed((prev) => {
        return { ...prev, drag: true };
      });
    }

    if (selectedTool === "delete") {
      setIsToolUsed((prev) => {
        return { ...prev, delete: true };
      });
    }

    if (selectedTool === "resize") {
      setIsToolUsed((prev) => {
        return { ...prev, resize: true };
      });
    }
  };

  return (
    <Fragment>
      {boxObject.type === "media" ? (
        <img
          onMouseDown={onMouseDown}
          id={boxObject.id}
          draggable='false'
          userselect='none'
          src={boxObject.src}
          alt='image'
          style={{
            outline: `${
              boxObject.id === box.selectedObjectId ? "2px dotted blue" : ""
            }`,
            position: "absolute",
            userSelect: "none",
            width: boxObject.width * box.scale,
            height: boxObject.height * box.scale,
            transform: `translate(${
              boxObject.position.x * box.scale + box.position.x
            }px, ${boxObject.position.y * box.scale + box.position.y}px)`,
          }}
        />
      ) : boxObject.type === "text" ? (
        <p
          onMouseDown={onMouseDown}
          id={boxObject.id}
          draggable='false'
          userselect='none'
          style={{
            fontSize: boxObject.fontSize * box.scale,
            outline: `${
              boxObject.id === box.selectedObjectId ? "2px dotted blue" : ""
            }`,
            position: "absolute",
            userSelect: "none",
            width: boxObject.width * box.scale,
            height: boxObject.height * box.scale,
            transform: `translate(${
              boxObject.position.x * box.scale + box.position.x
            }px, ${boxObject.position.y * box.scale + box.position.y}px)`,
          }}
        >
          {boxObject.text}
        </p>
      ) : null}
      {isToolUsed.drag ? (
        <VisualDragBlock
          box={box}
          setBox={setBox}
          boxObject={boxObject}
          tempObject={tempObject}
          setTempObject={setTempObject}
          setIsToolUsed={setIsToolUsed}
        />
      ) : isToolUsed.delete ? (
        <VisualDeleteBlock
          box={box}
          setBox={setBox}
          boxObject={boxObject}
          setIsToolUsed={setIsToolUsed}
        />
      ) : isToolUsed.resize ? (
        <VisualResizeBlock
          box={box}
          setBox={setBox}
          boxObject={boxObject}
          tempObject={tempObject}
          setTempObject={setTempObject}
          setIsToolUsed={setIsToolUsed}
        />
      ) : null}
    </Fragment>
  );
}

export default BoxObject;
