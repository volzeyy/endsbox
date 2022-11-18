import React from "react";

function CustomizeText({ box, setBox }) {
  return (
    <>
      <label htmlFor='set-background-color'>
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
