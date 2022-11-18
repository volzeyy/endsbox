import React from "react";

import styles from "./index.module.css";

import { useToolStore } from "../../stores/toolStore";
import CustomizeBackground from "../CustomizeBackground";
import CustomizeText from "../CustomizeText";

function PropertyBar({ box, setBox }) {
  const selectedTool = useToolStore((state) => state.selectedTool);

  return (
    <div className={styles.propertyBar}>
      {selectedTool === "customize-box" ? (
        <CustomizeBackground box={box} setBox={setBox} />
      ) : selectedTool === "add-text" ? (
        <CustomizeText box={box} setBox={setBox} />
      ) : null}
    </div>
  );
}

export default PropertyBar;
