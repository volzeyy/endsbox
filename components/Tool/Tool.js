import React, { useEffect, useState } from "react";

import { useToolStore } from "../../stores/toolStore";

// add tooltip too ( maybe use z-index too )
// and change background, color on active
function Tool({ className, toolTip, toolId, children, ...otherEvents }) {
  const selectedTool = useToolStore((state) => state.selectedTool);

  const handleToolChange = (e) => {
    if (toolId === "zoom-in" || toolId === "zoom-out") {
      return;
    }

    if (toolId === "import-media") {
      return;
    }

    useToolStore.getState().setSelectedTool(toolId);
  };

  return (
    <div className={className}>
      <div className='tool-tip'>
        <p>{toolTip}</p>
      </div>
      <label
        className={`tool ${toolId === selectedTool ? "active" : "default"}`}
        onClick={handleToolChange}
        {...otherEvents}
      >
        {children}
      </label>
    </div>
  );
}

export default Tool;
