import React, { useEffect } from "react";
import { useRouter } from "next/router";

import BoxAction from "../Tool";

import { v4 } from "uuid";

import PanToolAltRoundedIcon from "@mui/icons-material/PanToolAltRounded";
import PanToolRoundedIcon from "@mui/icons-material/PanToolRounded";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import ZoomOutRoundedIcon from "@mui/icons-material/ZoomOutRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import TitleRoundedIcon from "@mui/icons-material/TitleRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import CropFreeRoundedIcon from "@mui/icons-material/CropFreeRounded";
import VerticalAlignBottomRoundedIcon from "@mui/icons-material/VerticalAlignBottomRounded";
import VerticalAlignTopRoundedIcon from "@mui/icons-material/VerticalAlignTopRounded";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";

import { ref, uploadBytes } from "firebase/storage";
import { doc, setDoc, collection } from "firebase/firestore";
import { storage, db, auth } from "../../firebase/firebaseClient";

import { useToolStore } from "../../stores/toolStore";
import { useUserStore } from "../../stores/userStore";

import { useAuthState } from "react-firebase-hooks/auth";
import usePremiumStatus from "../../stripe/usePremiumStatus";

function ToolBar({ className, isSandbox, box, setBox }) {
  const userState = useUserStore((state) => state.user);
  const [user, userLoading] = useAuthState(auth);
  const selectedTool = useToolStore((state) => state.selectedTool);
  const router = useRouter();
  const { boxId } = router.query;

  useEffect(() => {
    setBox((prev) => {
      return { ...prev, selectedObjectId: "" };
    });
  }, [selectedTool]);

  const handleMediaImport = (e) => {
    let file = e.target.files[0];
    console.log(e);

    if (file === null || e.target.files.length === 0) {
      return;
    }
    let uuid = v4();

    if (isSandbox) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let media = new Image();
        media.src = reader.result;
        media.onload = () => {
          setBox((prevBox) => {
            return {
              ...prevBox,
              objects: [
                ...prevBox.objects,
                {
                  id: uuid,
                  src: reader.result,
                  position: {
                    x: prevBox.position.x * -1 * (1 / prevBox.scale),
                    y: prevBox.position.y * -1 * (1 / prevBox.scale),
                  },
                  width: media.width,
                  height: media.height,
                  index: prevBox.objects.length,
                  type: "media",
                },
              ],
            };
          });
        };
      };

      return;
    }

    let objectsRef = collection(db, "objects");
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
              await setDoc(doc(objectsRef, `${uuid}`), {
                owner: user.uid,
                id: uuid,
                position: {
                  x: box.position.x * -1 * (1 / box.scale),
                  y: box.position.y * -1 * (1 / box.scale),
                },
                width: media.width,
                height: media.height,
                index: box.objects.length,
                type: "media",
              });
              setBox((prevBox) => {
                return {
                  ...prevBox,
                  objects: [
                    ...prevBox.objects,
                    {
                      id: uuid,
                      src: reader.result,
                      position: {
                        x: prevBox.position.x * -1 * (1 / prevBox.scale),
                        y: prevBox.position.y * -1 * (1 / prevBox.scale),
                      },
                      width: media.width,
                      height: media.height,
                      index: prevBox.objects.length,
                      type: "media",
                    },
                  ],
                };
              });
            } catch (err) {
              console.log("Failed to Update Database");
            }
          };
        };
      })
      .catch((err) => {
        alert("Failed to Upload Image to Storage")
      });
  };

  /*
  const handleAddText = () => {
    setBox((prevBox) => {
      return {
        ...prevBox,
        objects: [
          ...prevBox.objects,
          {
            id: v4(),
            text: "Placeholder",
            position: {
              x: prevBox.position.x * -1 * (1 / prevBox.scale),
              y: prevBox.position.y * -1 * (1 / prevBox.scale),
            },
            fontSize: 16 * (1 / box.scale),
            index: prevBox.objects.length,
            type: "text",
          },
        ],
      };
    });
  };
  */

  const handleZoomIn = (e) => {
    e.preventDefault();

    setBox((prev) => {
      if (prev.scale >= 0.99) {
        return { ...prev, scale: 1 };
      }

      return { ...prev, scale: prev.scale + 0.1 };
    });
  };

  const handleZoomOut = (e) => {
    e.preventDefault();

    setBox((prev) => {
      if (prev.scale <= 0.11) {
        return { ...prev, scale: 0.1 };
      }

      return { ...prev, scale: prev.scale - 0.1 };
    });
  };

  return (
    <div className={className}>
      <div className='action-group'>
        {isSandbox || ( user && userState?.username === boxId ) ?
          <BoxAction toolTip='Select' toolId='select'>
            <PanToolAltRoundedIcon />
            <input type='button' style={{ display: "none" }} id='select' />
          </BoxAction>
        : null}
        <BoxAction toolTip='Pan' toolId='pan'>
          <PanToolRoundedIcon />
          <input type='button' style={{ display: "none" }} id='pan' />
        </BoxAction>
      </div>

      {isSandbox || user && userState?.username === boxId ?
        <div className='action-group'>
          <BoxAction toolTip='Import Media' toolId='import-media'>
            <AddPhotoAlternateRoundedIcon />
            <input
              type='file'
              style={{ display: "none" }}
              onChange={handleMediaImport}
              accept="image/*"
              id='import-media'
            />
          </BoxAction>
        </div>
      : null}

      {isSandbox || user && userState?.username === boxId ?
        <div className='action-group'>
          <BoxAction toolTip='Delete an Object' toolId='delete'>
            <DeleteForeverRoundedIcon />
            <input type='button' style={{ display: "none" }} id='delete' />
          </BoxAction>
          <BoxAction toolTip='Resize an Object' toolId='resize'>
            <CropFreeRoundedIcon />
            <input type='button' style={{ display: "none" }} id='resize' />
          </BoxAction>
        </div>
      : null}

      <div className='action-group'>
        <BoxAction toolTip='Zoom In' toolId='zoom-in' onClick={handleZoomIn}>
          <ZoomInRoundedIcon />
          <input type='button' style={{ display: "none" }} id='zoom-in' />
        </BoxAction>
        <BoxAction toolTip='Zoom Out' toolId='zoom-out' onClick={handleZoomOut}>
          <ZoomOutRoundedIcon />
          <input type='button' style={{ display: "none" }} id='zoom-out' />
        </BoxAction>
      </div>

      {isSandbox || user && userState?.username === boxId ?
        <div className='action-group'>
          <BoxAction toolTip='Customize this Box' toolId='customize-box'>
            <PaletteRoundedIcon />
            <input type='button' style={{ display: "none" }} id='customize-box' />
          </BoxAction>
        </div>
      : null}
    </div>
  );
}

export default ToolBar;
