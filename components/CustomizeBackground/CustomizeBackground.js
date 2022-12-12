import { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";
import { useUserStore } from "../../stores/userStore";

import { ref, uploadBytes, deleteObject } from "firebase/storage";
import { doc, setDoc, collection, deleteDoc } from "firebase/firestore";
import { storage, db } from "../../firebase/firebaseClient";
import { v4 } from "uuid";

function CustomizeBackground({ box, setBox, isSandbox }) {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const { boxId } = router.query;

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    if (isSandbox) {
      return;
    }

    if (!boxId) {
      return;
    }

    let uuid = v4();

    const updateFirebaseBackground = async () => {
      let backgroundsRef = collection(db, "backgrounds");
      let backgroundRef = ref(storage, `boxes/${boxId}/${uuid}`);

      if (!box.background.id) {
        await setDoc(doc(backgroundsRef, `${uuid}`), {
          owner: user.uid,
          ...box.background,
          id: uuid,
          image: "",
        });
        uploadBytes(backgroundRef, "")
          .then(() => {
            console.log("uploaded background")
          })
          .catch((err) => {
            alert("Failed to Upload Background");
          });
          return
      }

      await setDoc(doc(backgroundsRef, `${box.background.id}`), {
        owner: user.uid,
        ...box.background,
        image: "",
      });
    };

    let delayThis = setTimeout(updateFirebaseBackground, 2000);

    return () => {
      clearTimeout(delayThis);
    };
  }, [box.background]);

  const handleBackgroundColorChange = (e) => {
    e.preventDefault();

    setBox((prev) => {
      return {
        ...prev,
        background: {
          ...prev.background,
          color: e.target.value,
        },
      };
    });
  };

  const handleBackgroundUpload = async (e) => {
    let file = e.target.files[0];

    if (file === null || e.target.files.length === 0) {
      return;
    }

    let uuid = v4();

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let media = new Image();
      media.src = reader.result;
      media.onload = () => {
        setBox((prev) => {
          return {
            ...prev,
            background: {
              ...prev.background,
              image: reader.result,
            },
          };
        });
      };
    };

    if (isSandbox) {
      return;
    }

    if (box.background.id) {
      await deleteDoc(doc(db, "backgrounds", box.background.id));
      let backgroundRef = ref(storage, `boxes/${boxId}/${box.background.id}`);
      deleteObject(backgroundRef)
        .then(() => {
          console.log("deleted");
        })
        .catch((err) => {
          alert("Failed to Delete Object")
        });

      let backgroundsRef = collection(db, "backgrounds");
      backgroundRef = ref(storage, `boxes/${boxId}/${box.background.id}`);
      uploadBytes(backgroundRef, file)
        .then(() => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            let media = new Image();
            media.src = reader.result;
            media.onload = async () => {
              try {
                await setDoc(doc(backgroundsRef, `${box.background.id}`), {
                  owner: user.uid,
                  ...box.background,
                  image: "",
                });
                setBox((prev) => {
                  return {
                    ...prev,
                    background: {
                      ...prev.background,
                      image: reader.result,
                    },
                  };
                });
              } catch (err) {
                alert("Failed to update Background Document")
              }
            };
          };
        })
        .catch((err) => {
          alert("Failed to Upload Background to Storage");
        });
      return;
    }

    let backgroundsRef = collection(db, "backgrounds");
    let objectRef = ref(storage, `boxes/${boxId}/${uuid}`);
    uploadBytes(objectRef, file)
      .then(() => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let media = new Image();
          media.src = reader.result;
          media.onload = async () => {
            try {
              await setDoc(doc(backgroundsRef, `${uuid}`), {
                owner: user.uid,
                id: uuid,
              });
              setBox((prev) => {
                return {
                  ...prev,
                  background: {
                    ...prev.background,
                    id: uuid,
                    image: reader.result,
                  },
                };
              });
            } catch (err) {
              alert("Failed to update Background Document")
            }
          };
        };
      })
      .catch((err) => {
        alert("Failed to Upload Background to Storage");
      });
  };

  const handleRepeatChange = (e) => {
    setBox((prev) => {
      return {
        ...prev,
        background: {
          ...prev.background,
          repeat: e.target.value,
        },
      };
    });
  };

  const handleBlendModeChange = (e) => {
    setBox((prev) => {
      return {
        ...prev,
        background: {
          ...prev.background,
          blendMode: e.target.value,
        },
      };
    });
  };

  const handleBackgroundSizeChange = (e) => {
    setBox((prev) => {
      return {
        ...prev,
        background: {
          ...prev.background,
          size: e.target.value,
        },
      };
    });
  };

  const handleBackgroundPositionXChange = (e) => {
    setBox((prev) => {
      return {
        ...prev,
        background: {
          ...prev.background,
          position: {
            ...prev.background.position,
            x: e.target.value,
          },
        },
      };
    });
  };

  const handleBackgroundPositionYChange = (e) => {
    setBox((prev) => {
      return {
        ...prev,
        background: {
          ...prev.background,
          position: {
            ...prev.background.position,
            y: e.target.value,
          },
        },
      };
    });
  };

  return (
    <>
      <label htmlFor='set-background-color'>
        Change Background Color
        <input
          type='color'
          id='set-background-color'
          value={box.background.color}
          onChange={handleBackgroundColorChange}
        ></input>
      </label>
      <label htmlFor='set-background-image'>
        Upload Background Image
        <input
          type='file'
          id='set-background-image'
          onChange={handleBackgroundUpload}
        ></input>
      </label>
      <label htmlFor='set-background-repeat'>
        Background Repeat
        <select
          id='set-background-repeat'
          value={box.background.repeat}
          onChange={handleRepeatChange}
        >
          <option value='repeat'>repeat</option>
          <option value='repeat-x'>repeat x</option>
          <option value='repeat-y'>repeat y</option>
          <option value='no-repeat'>no repeat</option>
          <option value='space'>space</option>
          <option value='round'>round</option>
        </select>
      </label>
      <label htmlFor='set-background-blend-mode'>
        Background Blend Mode
        <select
          id='set-background-blend-mode'
          value={box.background.blendMode}
          onChange={handleBlendModeChange}
        >
          <option value='normal'>normal</option>
          <option value='multiply'>multiply</option>
          <option value='screen'>screen</option>
          <option value='overlay'>overlay</option>
          <option value='darken'>darken</option>
          <option value='lighten'>lighten</option>
          <option value='color-dodge'>color dodge</option>
          <option value='saturation'>saturation</option>
          <option value='color'>color</option>
          <option value='luminosity'>lighten</option>
        </select>
      </label>
      <label htmlFor='set-background-size'>
        Background Size
        <select
          id='set-background-size'
          value={box.background.size}
          onChange={handleBackgroundSizeChange}
        >
          <option value='auto'>auto</option>
          <option value='cover'>cover</option>
          <option value='contain'>contain</option>
          <option value='initial'>initial</option>
        </select>
      </label>
      <label htmlFor='set-background-position-x'>
        Position X
        <input
          id='set-background-position-x'
          type='number'
          name='background-position-x'
          value={box.background.position.x}
          onChange={handleBackgroundPositionXChange}
        />
      </label>
      <label htmlFor='set-background-position-y'>
        Position Y
        <input
          id='set-background-position-y'
          type='number'
          name='background-position-y'
          value={box.background.position.y}
          onChange={handleBackgroundPositionYChange}
        />
      </label>
    </>
  );
}

export default CustomizeBackground;
