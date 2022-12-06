import React, { useEffect, useState } from "react";

import BoxObject from "../BoxObject";

import { useToolStore } from "../../stores/toolStore";

function BoxView({ className, box, setBox, isSandbox }) {
  const selectedTool = useToolStore((state) => state.selectedTool);

  const [isCanDragBox, setIsCanDragBox] = useState(false);
  const [previousTouch, setPreviousTouch] = useState(false);

  useEffect(() => {
    console.log(box.background)
    document.body.style.backgroundOrigin
    document.body.style.backgroundImage = `url(${box.background.image})`;
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
      };
    });
  };

  const onTouchStart = (e) => {
    setPreviousTouch(e.touches[0])

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
      };
    });
  }

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

  const dragBoxMobile = (e) => {
      const touch = e.touches[0];
  
      if (isCanDragBox) {
        if (previousTouch) {
          let movementX = touch.pageX - previousTouch.pageX;
          let movementY = touch.pageY - previousTouch.pageY;
    
          setBox((prevBox) => {
            return {
              ...prevBox,
              position: {
                x: prevBox.position.x + movementX,
                y: prevBox.position.y + movementY,
              },
            };
          });
        }
      }
  
    setPreviousTouch(touch);
  }

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
        isSandbox={isSandbox ? true : false}
      />
    );
  });

  return (
    <div
      className={className}
      onMouseDown={onMouseDown}
      onMouseMove={dragBox}
      onMouseUp={dragBoxEnd}
      onTouchStart={onTouchStart}
      onTouchMove={dragBoxMobile}
      onTouchEnd={dragBoxEnd}
    >
      {boxObjects}
    </div>
  );
}

export default BoxView;
