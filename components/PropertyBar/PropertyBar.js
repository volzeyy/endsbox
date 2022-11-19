import React from "react";

import { useToolStore } from "../../stores/toolStore";
import CustomizeBackground from "../CustomizeBackground";
import CustomizeText from "../CustomizeText";

function PropertyBar({ className, box, setBox }) {
  const selectedTool = useToolStore((state) => state.selectedTool);

  return (
    <div className={className}>
      {selectedTool === "customize-box" ? (
        <CustomizeBackground box={box} setBox={setBox} />
      ) : selectedTool === "add-text" ? (
        <CustomizeText box={box} setBox={setBox} />
      ) : null}
    </div>
  );
}

export default PropertyBar;
