import React, { useEffect, useState } from "react";

import BoxObject from "../BoxObject";

import { useToolStore } from "../../stores/toolStore";

function BoxView({ className, box, setBox }) {
  const selectedTool = useToolStore((state) => state.selectedTool);

  const [isCanDragBox, setIsCanDragBox] = useState(false);

  useEffect(() => {
    document.body.style.backgroundImage = box.background.image;
    document.body.style.backgroundColor = box.background.color;
    document.body.style.backgroundRepeat = box.background.repeat;
    document.body.style.backgroundBlendMode = box.background.blendMode;
    document.body.style.backgroundSize = box.background.size;
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundPositionX = `${box.background.position.x}px`;
    document.body.style.backgroundPositionY = `${box.background.position.y}px`;
  }, [box.background]);

  const onMouseDown = (e) => {
    if (selectedTool == "pan") {
      setIsCanDragBox(true);
      return;
    }
    
    if (e.target.offsetParent.id) {
      return;
    }

    setBox((prev) => {
      return {
        ...prev,
        selectedObjectId: "",
      }
    })
  };

  const dragBox = (e) => {
    if (isCanDragBox) {
      setBox((prevBox) => {
        return {
          ...prevBox,
          position: {
            x: prevBox.position.x + e.movementX,
            y: prevBox.position.y + e.movementY,
          },
        };
      });
    }
  };

  const dragBoxEnd = () => {
    setIsCanDragBox(false);
  };

  const boxObjects = box.objects.map((object) => {
    return (
      <BoxObject
          key={object.id}
          boxObject={object}
          box={box}
          setBox={setBox}
        />
    )
  });

  return (
    <div
      className={className}
      onMouseDown={onMouseDown}
      onMouseMove={dragBox}
      onMouseUp={dragBoxEnd}
    >
      {boxObjects}
    </div>
  );
}

export default BoxView;
