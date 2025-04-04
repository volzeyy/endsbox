const VisualResizeBlock = ({
  box,
  boxObject,
  tempObject,
  setTempObject,
  resizeObjectEnd,
}) => {
  const resizeObject = (e) => {
    setTempObject((prev) => {
      return {
        ...prev,
        width: prev.width + Math.round(e.movementX * 2 * (1 / box.scale)),
        height: prev.height + Math.round(e.movementY * 2 * (1 / box.scale)),
      };
    });
  };

  return (
    <div
      onMouseMove={resizeObject}
      onMouseUp={resizeObjectEnd}
      onMouseOut={resizeObjectEnd}
      style={{
        position: "absolute",
        zIndex: box.objects.length + 1,
        width: tempObject.width * box.scale,
        height: tempObject.height * box.scale,
        backgroundColor: "rgba(255, 146, 0, 0.4)",
        transform: `translate(${
          boxObject.position.x * box.scale + box.position.x
        }px, ${boxObject.position.y * box.scale + box.position.y}px)`,
      }}
    />
  );
};

export default VisualResizeBlock;
