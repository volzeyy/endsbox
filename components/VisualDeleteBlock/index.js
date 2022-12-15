const VisualDeleteBlock = ({
  box,
  setBox,
  boxObject,
  setIsToolUsed,
  deleteBoxObject,
}) => {
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
      onMouseUp={deleteBoxObject}
      onMouseOut={deleteObjectEnd}
      style={{
        position: "absolute",
        zIndex: box.objects.length + 1,
        width: boxObject.width * box.scale,
        height: boxObject.height * box.scale,
        backgroundColor: "rgba(255, 10, 20, 0.43)",
        left: `${boxObject.position.x * box.scale + box.position.x}px`,
        top: `${boxObject.position.y * box.scale + box.position.y}px`,
      }}
    />
  );
};

export default VisualDeleteBlock;
