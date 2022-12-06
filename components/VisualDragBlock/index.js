const VisualDragBlock = ({
  box,
  boxObject,
  tempObject,
  setTempObject,
  dragObjectEnd,
}) => {

  const dragObject = (e) => {
    setTempObject((prev) => {
      return {
        ...prev,
        position: {
          x: prev.position.x + Math.round(e.movementX * (1 / box.scale)),
          y: prev.position.y + Math.round(e.movementY * (1 / box.scale)),
        },
      };
    });
  };

  return (
    <div
      onMouseMove={dragObject}
      onMouseUp={dragObjectEnd}
      onMouseOut={dragObjectEnd}
      draggable="false"
      style={{
        position: "absolute",
        zIndex: box.objects.length + 1,
        width: boxObject.width * box.scale,
        height: boxObject.height * box.scale,
        backgroundColor: "rgba(0, 146, 255, 0.43)",
        transform: `translate(${
          tempObject.position.x * box.scale + box.position.x
        }px, ${tempObject.position.y * box.scale + box.position.y}px)`, //  is the height of the navBar, yeah, I'll fix it
      }}
    />
  );
};

export default VisualDragBlock;
