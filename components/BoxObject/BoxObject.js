import React, { Fragment, useState, useEffect } from "react";

import { useRouter } from "next/router";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc, runTransaction } from "firebase/firestore";
import { db, storage } from "../../firebase/firebaseClient";

import { useToolStore } from "../../stores/toolStore";

import VisualDragBlock from "../VisualDragBlock";
import VisualDeleteBlock from "../VisualDeleteBlock";
import VisualResizeBlock from "../VisualResizeBlock";

function BoxObject({ boxObject, box, setBox, isSandbox }) {
  const selectedTool = useToolStore((state) => state.selectedTool);
  const router = useRouter();
  const { boxId } = router.query;

  const [isToolUsed, setIsToolUsed] = useState({
    drag: false,
    delete: false,
    resize: false,
  });

  const [tempObject, setTempObject] = useState({
    position: {
      x: boxObject.position.x,
      y: boxObject.position.y,
    },
    width: boxObject.width,
    height: boxObject.height,
  });

  const [touch, setTouch] = useState(null);

  useEffect(() => {
    if (boxObject.type === "text") {
      console.log(boxObject);
      const text = document.getElementById(boxObject.id);

      setTempObject((prev) => {
        return {
          ...prev,
          width: text.clientWidth * (1 / box.scale),
          height: text.clientHeight * (1 / box.scale),
        };
      });

      const newState = box.objects.map((object) => {
        if (object.id === boxObject.id) {
          return {
            width: text.clientWidth * (1 / box.scale),
            height: text.clientHeight * (1 / box.scale),
            ...object,
          };
        }

        return object;
      });

      setBox((prev) => {
        return { ...prev, objects: newState };
      });
    }
  }, []);

  const onMouseDown = () => {
    if (selectedTool === "select") {
      setIsToolUsed((prev) => {
        return { ...prev, drag: true };
      });
    }

    if (selectedTool === "delete") {
      setIsToolUsed((prev) => {
        return { ...prev, delete: true };
      });
    }

    if (selectedTool === "resize") {
      setIsToolUsed((prev) => {
        return { ...prev, resize: true };
      });
    }
  };

  const onTouchStart = (e) => {
    setTouch(e.touches[0]);

    if (selectedTool === "select") {
      setIsToolUsed((prev) => {
        return { ...prev, drag: true };
      });
    }

    if (selectedTool === "delete") {
      setIsToolUsed((prev) => {
        return { ...prev, delete: true };
      });
    }

    if (selectedTool === "resize") {
      setIsToolUsed((prev) => {
        return { ...prev, resize: true };
      });
    }
  };

  const onTouchEnd = (e) => {
    if (selectedTool === "select") {
      dragObjectEnd(e);
    }

    if (selectedTool === "resize") {
      resizeObjectEnd(e);
    }

    if (selectedTool === "delete") {
      deleteBoxObject(e);
    }
  };

  const onTouchMove = (e) => {
    if (selectedTool === "select") {
      dragObjectMobile(e);
    }

    if (selectedTool === "resize") {
      resizeObjectMobile(e);
    }
  };

  const dragObjectMobile = (e) => {
    if (selectedTool !== "select") {
      return;
    }

    let currentTouch = e.touches[0];

    if (touch) {
      let movementX = currentTouch.pageX - touch.pageX;
      let movementY = currentTouch.pageY - touch.pageY;
      setTempObject((prev) => {
        return {
          ...prev,
          position: {
            x: prev.position.x + Math.round(movementX * (1 / box.scale)),
            y: prev.position.y + Math.round(movementY * (1 / box.scale)),
          },
        };
      });
    }

    setTouch(currentTouch);
  };

  const resizeObjectMobile = (e) => {
    let currentTouch = e.touches[0];

    if (touch) {
      let movementX = currentTouch.pageX - touch.pageX;
      let movementY = currentTouch.pageY - touch.pageY;
      setTempObject((prev) => {
        return {
          ...prev,
          width: prev.width + Math.round(movementX * 2 * (1 / box.scale)),
          height: prev.height + Math.round(movementY * 2 * (1 / box.scale)),
        };
      });
    }

    setTouch(currentTouch);
  };

  const dragObjectEnd = () => {
    if (selectedTool !== "select") {
      return;
    }

    setIsToolUsed((prev) => {
      return { ...prev, drag: false };
    });

    if (
      tempObject.position.x === boxObject.position.x &&
      tempObject.position.y === boxObject.position.y
    ) {
      setBox((prev) => {
        return {
          ...prev,
          selectedObjectId:
            boxObject.id === prev.selectedObjectId ? "" : boxObject.id,
        };
      });

      return;
    }

    const newState = box.objects.map((object) => {
      if (object.id === boxObject.id) {
        return {
          ...object,
          position: {
            x: tempObject.position.x,
            y: tempObject.position.y,
          },
        };
      }

      return object;
    });
    const oldState = box.objects;

    setBox((prev) => {
      return { ...prev, objects: newState };
    });

    if (!isSandbox) {
      const savePosition = async () => {
        runTransaction(db, async (transaction) => {
          const objectRef = doc(db, "objects", boxObject.id);
          const objectDoc = await transaction.get(objectRef);
          if (objectDoc.exists()) {
            transaction.update(objectRef, {
              position: {
                x: tempObject.position.x,
                y: tempObject.position.y,
              },
            });
          }
        })
          .then(() => {
            console.log("success");
          })
          .catch(() => {
            setTempObject((prev) => {
              return {
                ...prev,
                position: {
                  x: boxObject.position.x,
                  y: boxObject.position.y,
                },
              };
            });
            setBox((prev) => {
              return { ...prev, objects: oldState };
            });
          });
      };
      savePosition();
    }
  };

  const resizeObjectEnd = () => {
    if (selectedTool !== "resize") {
      return;
    }

    setIsToolUsed((prev) => {
      return { ...prev, resize: false };
    });

    if (
      boxObject.width === tempObject.width &&
      boxObject.height === tempObject.height
    ) {
      return;
    }

    const newState = box.objects.map((object) => {
      if (object.id === boxObject.id) {
        return {
          ...object,
          width: tempObject.width,
          height: tempObject.height,
        };
      }
      return object;
    });
    const oldState = box.objects;

    setBox((prev) => {
      return { ...prev, objects: newState };
    });

    if (!isSandbox) {
      console.log("saveeeeeeeeeeeeeeeeee resizeeeeeeeeeeeeeee");
      const saveScale = async () => {
        runTransaction(db, async (transaction) => {
          const objectRef = doc(db, "objects", boxObject.id);
          const objectDoc = await transaction.get(objectRef);
          if (objectDoc.exists()) {
            transaction.update(objectRef, {
              width: tempObject.width,
              height: tempObject.height,
            });
          }
        })
          .then(() => {
            console.log("success");
          })
          .catch(() => {
            setTempObject((prev) => {
              return {
                ...prev,
                width: boxObject.width,
                height: boxObject.height,
              };
            });
            setBox((prev) => {
              return { ...prev, objects: oldState };
            });
          });
      };
      saveScale();
    }
  };

  const deleteBoxObject = () => {
    const newState = box.objects.filter((object) => {
      return object.id !== boxObject.id;
    });

    if (!isSandbox) {
      console.log("deleteeeeeeeeeee objecttttttttttttttttt");
      const deleteObjectFirebase = async () => {
        try {
          await deleteDoc(doc(db, "objects", boxObject.id));
          console.log("1");
          const objectRef = ref(storage, `boxes/${boxId}/${boxObject.id}`);
          console.log("2");
          deleteObject(objectRef)
            .then(() => {
              console.log("3");
              setBox((prev) => {
                return { ...prev, objects: newState };
              });
            })
            .catch((err) => {
              console.log("4 - err");
              console.log(err);
              setIsToolUsed((prev) => {
                return { ...prev, delete: false };
              });
            });
        } catch (err) {
          console.log("Objectttttttt Deletion Failed: ", err);
        }
      };

      deleteObjectFirebase();
      return;
    }

    setBox((prev) => {
      return { ...prev, objects: newState };
    });
  };

  return (
    <Fragment>
      <div
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        id={boxObject?.id}
        draggable='false'
        userselect='none'
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          outline: `${
            boxObject?.id === box?.selectedObjectId ? "2px dotted blue" : ""
          }`,
          transform: `translate(${
            boxObject.position.x * box.scale + box.position.x
          }px, ${boxObject.position.y * box.scale + box.position.y}px)`,
          width: `${Math.round(boxObject?.width && boxObject?.width * box.scale)}px`,
          height: `${Math.round(boxObject?.height && boxObject?.height * box.scale)}px`,
        }}
      >
        {boxObject?.type === "media" ? (
          <img
            draggable='false'
            referrerPolicy="no-referrer"
            src={boxObject.src}
            alt='image'
            width='100%'
            height='100%'
            style={{
              userSelect: "none",
            }}
          />
        ) : boxObject?.type === "text" ? (
          <p
            draggable='false'
            style={{
              margin: 0,
              fontSize: boxObject.fontSize * box.scale,
              userSelect: "none",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            {boxObject.text}
          </p>
        ) : null}
      </div>
      {isToolUsed.drag ? (
        <VisualDragBlock
          box={box}
          setBox={setBox}
          boxObject={boxObject}
          tempObject={tempObject}
          setTempObject={setTempObject}
          setIsToolUsed={setIsToolUsed}
          dragObjectEnd={dragObjectEnd}
          isSandbox={isSandbox ? true : false}
        />
      ) : isToolUsed.delete ? (
        <VisualDeleteBlock
          box={box}
          setBox={setBox}
          boxObject={boxObject}
          deleteBoxObject={deleteBoxObject}
          setIsToolUsed={setIsToolUsed}
          isSandbox={isSandbox ? true : false}
        />
      ) : isToolUsed.resize ? (
        <VisualResizeBlock
          box={box}
          setBox={setBox}
          boxObject={boxObject}
          tempObject={tempObject}
          resizeObjectEnd={resizeObjectEnd}
          setTempObject={setTempObject}
          setIsToolUsed={setIsToolUsed}
          isSandbox={isSandbox ? true : false}
        />
      ) : null}
    </Fragment>
  );
}

export default BoxObject;
