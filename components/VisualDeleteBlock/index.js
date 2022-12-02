import React from "react";
import { useRouter } from "next/router";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";

const VisualDeleteBlock = ({
  box,
  setBox,
  boxObject,
  setIsToolUsed,
  isSandbox,
}) => {
  const router = useRouter();
  const { boxId } = router.query;

  const deleteBoxObject = () => {
    const newState = box.objects.filter((object) => {
      return object.id !== boxObject.id;
    });

    if (!isSandbox) {
      console.log("deleteeeeeeeeeee objecttttttttttttttttt");
      const deleteObjectFirebase = async () => {
        try {
          await deleteDoc(doc(db, "objects", boxObject.id));
          console.log("1")
          const objectRef = ref(storage, `boxes/${boxId}/${boxObject.id}`);
          console.log("2")
          deleteObject(objectRef).then(() => {
            console.log("3")
            setBox((prev) => {
              return { ...prev, objects: newState };
            });
          }).catch((err) => {
            console.log("4 - err")
            console.log(err)
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
        transform: `translate(${
          boxObject.position.x * box.scale + box.position.x
        }px, ${boxObject.position.y * box.scale + box.position.y}px)`,
      }}
    />
  );
};

export default VisualDeleteBlock;
