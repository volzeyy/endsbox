import React, { useEffect, useState } from "react";

import styles from "./index.module.css";

function CustomizeText({ box, setBox }) {
  return (
    <>
      <label htmlFor='set-background-color' className={styles.input}>
        Edit Text
        <input
          type='text'
          id='set-background-color'
          value={box.objects[box.selectedObjectId]}
        ></input>
      </label>
    </>
  );
}

export default CustomizeText;
