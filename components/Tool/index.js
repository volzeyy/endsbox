import React, { useEffect, useState } from "react";

import styles from "./index.module.css";

import { useToolStore } from "../../stores/toolStore";

// add tooltip too ( maybe use z-index too )
// and change background, color on active
function Tool({ toolTip, toolId, children, ...otherEvents }) {
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
    <div className={styles.toolContainer}>
      <div className={styles.toolTip}>
        <p>{toolTip}</p>
      </div>
      <label
        className={
          toolId === selectedTool
            ? `${styles.tool} ${styles.active}`
            : `${styles.tool} ${styles.default}`
        }
        onClick={handleToolChange}
        {...otherEvents}
      >
        {children}
      </label>
    </div>
  );
}

export default Tool;
