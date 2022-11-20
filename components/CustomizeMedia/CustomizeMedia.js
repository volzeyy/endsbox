import React from "react";

function CustomizeMedia({ selectedObject, box, setBox }) {
  return (
    <>
      <label htmlFor='set-background-color'>
        Edit Media
        <input
          type='text'
          id='set-background-color'
          value={box.objects[box.selectedObjectId]}
        ></input>
      </label>
    </>
  );
}

export default CustomizeMedia;