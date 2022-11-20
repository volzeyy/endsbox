import React from "react";

const VisualDeleteBlock = ({ box, setBox, boxObject, setIsToolUsed }) => {
  const deleteObject = () => {
    const newState = box.objects.filter((object) => {
      return object.id !== boxObject.id;
    });

    setBox((prev) => {
      return { ...prev, objects: newState };
    });
  };

  const deleteObjectEnd = () => {
    setIsToolUsed((prev) => {
      return { ...prev, delete: false };
    });
    setBox((prev) => {
      return { ...prev, selectedObjectId: "" };
    });
  };

  return (
    <div
      onMouseUp={deleteObject}
      onMouseOut={deleteObjectEnd}
      style={{
        position: "absolute",
        zIndex: box.objects.length + 1,
        width: boxObject.width * box.scale,
        height: boxObject.height * box.scale,
        backgroundColor: "rgba(255, 10, 20, 0.43)",
        transform: `translate(${
          boxObject.position.x * box.scale + box.position.x
        }px, ${boxObject.position.y * box.scale + box.position.y}px)`,
      }}
    />
  );
};

export default VisualDeleteBlock;
