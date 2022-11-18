import React, { useEffect } from "react";

//STYLES
import styles from "./index.module.css";

// COMPONENTS
import BoxAction from "../Tool";

// EXTERNAL LIBS
import { v4 } from "uuid";

// MUI ICONS
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

// other

import { useToolStore } from "../../stores/toolStore";

function ToolBar({ box, setBox }) {
  const selectedTool = useToolStore((state) => state.selectedTool);

  useEffect(() => {
    setBox((prev) => {
      return { ...prev, selectedObjectId: "" };
    });
  }, [selectedTool]);

  const handleMediaImport = (e) => {
    let file = e.target.files[0];

    if (file === null) {
      return;
    }

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
                id: v4(),
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
  };

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
            fontSize: 16,
            index: prevBox.objects.length,
            type: "text",
          },
        ],
      };
    });
  };

  const handleZoomIn = (e) => {
    e.preventDefault();

    setBox((prev) => {
      if (prev.scale >= 0.99) {
        return { ...prev, scale: 1 };
      }

      return { ...prev, scale: prev.scale + 0.05 };
    });
  };

  const handleZoomOut = (e) => {
    e.preventDefault();

    setBox((prev) => {
      if (prev.scale <= 0.051) {
        return { ...prev, scale: 0.05 };
      }

      return { ...prev, scale: prev.scale - 0.05 };
    });
  };

  const handleSortToTheBottom = (e) => {
    e.preventDefault();
  };

  const handleSortToTheTop = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.actionBar}>
      <div className={styles.actionGroup}>
        <BoxAction toolTip='Select' toolId='select'>
          <PanToolAltRoundedIcon />
          <input type='button' style={{ display: "none" }} id='select' />
        </BoxAction>
        <BoxAction toolTip='Pan' toolId='pan'>
          <PanToolRoundedIcon />
          <input type='button' style={{ display: "none" }} id='pan' />
        </BoxAction>
      </div>

      <div className={styles.actionGroup}>
        <BoxAction toolTip='Import Media' toolId='import-media'>
          <AddPhotoAlternateRoundedIcon />
          <input
            type='file'
            style={{ display: "none" }}
            onChange={handleMediaImport}
            id='import-media'
          />
        </BoxAction>
        <BoxAction toolTip='Add Text' toolId='add-text'>
          <TitleRoundedIcon />
          <input
            type='button'
            style={{ display: "none" }}
            onClick={handleAddText}
            id='add-text'
          />
        </BoxAction>
      </div>

      <div className={styles.actionGroup}>
        <BoxAction toolTip='Delete an Object' toolId='delete'>
          <DeleteForeverRoundedIcon />
          <input type='button' style={{ display: "none" }} id='delete' />
        </BoxAction>
        <BoxAction toolTip='Resize an Object' toolId='resize'>
          <CropFreeRoundedIcon />
          <input type='button' style={{ display: "none" }} id='resize' />
        </BoxAction>
      </div>

      <div className={styles.actionGroup}>
        <BoxAction toolTip='Zoom In' toolId='zoom-in' onClick={handleZoomIn}>
          <ZoomInRoundedIcon />
          <input type='button' style={{ display: "none" }} id='zoom-in' />
        </BoxAction>
        <BoxAction toolTip='Zoom Out' toolId='zoom-out' onClick={handleZoomOut}>
          <ZoomOutRoundedIcon />
          <input type='button' style={{ display: "none" }} id='zoom-out' />
        </BoxAction>
      </div>

      {box.selectedObjectId ? (
        <div className={styles.actionGroup}>
          <BoxAction
            toolTip='Move Object to the Bottom'
            toolId='sort-bottom'
            onClick={handleSortToTheBottom}
          >
            <VerticalAlignBottomRoundedIcon />
            <input type='button' style={{ display: "none" }} id='sort-bottom' />
          </BoxAction>
          <BoxAction
            toolTip='Move Object to the Top'
            toolId='sort-top'
            onClick={handleSortToTheTop}
          >
            <VerticalAlignTopRoundedIcon />
            <input type='button' style={{ display: "none" }} id='sort-top' />
          </BoxAction>
        </div>
      ) : null}

      <div className={styles.actionGroup}>
        <BoxAction toolTip='Customize this Box' toolId='customize-box'>
          <PaletteRoundedIcon />
          <input type='button' style={{ display: "none" }} id='customize-box' />
        </BoxAction>
      </div>
    </div>
  );
}

export default ToolBar;
