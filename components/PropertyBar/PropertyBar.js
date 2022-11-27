import React, { useState, useEffect } from "react";

import { useToolStore } from "../../stores/toolStore";
import CustomizeBackground from "../CustomizeBackground";
import CustomizeText from "../CustomizeText";
import CustomizeMedia from "../CustomizeMedia";

function PropertyBar({ className, box, setBox }) {
  const selectedTool = useToolStore((state) => state.selectedTool);

  const [selectedObject, setSelectedObject] = useState({});

  useEffect(() => {
    if (box.selectedObjectId) {
      for (const object of box.objects) {
        if (object.id === box.selectedObjectId) {
          setSelectedObject(object);
        }
      }
    }
  }, [box.selectedObjectId]);

  // move things like changing order to this ocmponent instead of it being in toolbar

  return (
    <div className={className}>
      {selectedTool === "customize-box" ? (
        <CustomizeBackground box={box} setBox={setBox} />
      ) : selectedObject.type === "text" ? (
        <CustomizeText
          selectedObject={selectedObject}
          box={box}
          setBox={setBox}
        />
      ) : selectedObject.type === "media" ? (
        <CustomizeMedia
          selectedObject={selectedObject}
          box={box}
          setBox={setBox}
        />
      ) : null}
    </div>
  );
}

export default PropertyBar;
