import React from 'react'

//STYLES
import styles from "./index.module.css"

// COMPONENTS
import BoxAction from '../BoxAction'

// MUI ICONS
import PanToolAltRoundedIcon from '@mui/icons-material/PanToolAltRounded';
import PanToolRoundedIcon from '@mui/icons-material/PanToolRounded';

import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import ZoomOutRoundedIcon from '@mui/icons-material/ZoomOutRounded';

import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import CropFreeRoundedIcon from '@mui/icons-material/CropFreeRounded';

import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';

function BoxActionBar({currentAction, setCurrentAction, setBoxObjects, boxPositionX, boxPositionY, setBoxScale}) {

  const handleMediaImport = (e) => {
    setCurrentAction("select")
    let file = e.target.files[0]

    if (file === null) {
      return;
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      let media = new Image
      media.src = reader.result
      media.onload = () => {
        setBoxObjects(prev => {
          return [...prev, {
            id: prev.length,
            src: reader.result,
            positionX: boxPositionX * (-1),
            positionY: boxPositionY * (-1),
            width: media.width,
            height: media.height,
            index: prev.length,
            type: "media",
          }]
        })
      }
    }
  }

  const handleZoomIn = (e) => {
    e.preventDefault()

    setBoxScale(prev => {
      if (prev >= 1.59) {
        return prev = 1.6
      }

      return prev += 0.2
    })
  }

  const handleZoomOut = (e) => {
    e.preventDefault()

    setBoxScale(prev => {
      if (prev <= 0.21) {
        return prev = 0.2
      }

      return prev -= 0.2
    })
  }

  return (
    <div className={styles.actionBar}>
      <div className={styles.actionGroup}>
        <BoxAction
          actionTip="Select"
          actionId="select"
          currentAction={currentAction}
          setCurrentAction={setCurrentAction}
        >
          <PanToolAltRoundedIcon />
          <input type="button" style={{display: "none"}} id='select' />
        </BoxAction>
        <BoxAction
          actionTip="Pan"
          actionId="pan"
          currentAction={currentAction}
          setCurrentAction={setCurrentAction}
        >
          <PanToolRoundedIcon />
          <input type="button" style={{display: "none"}} id='pan' />
        </BoxAction>
      </div>
      <div className={styles.actionGroup}>
        <BoxAction
          actionTip="Import Media"
          actionId="import-media"
          currentAction={currentAction}
          setCurrentAction={setCurrentAction}
        >
          <AddPhotoAlternateRoundedIcon />
          <input type="file" style={{display: "none"}} onChange={handleMediaImport} id='import-media' />
        </BoxAction>
      </div>
      <div className={styles.actionGroup}>
        <BoxAction
          actionTip="Delete an Object"
          actionId="delete"
          currentAction={currentAction}
          setCurrentAction={setCurrentAction}
        >
          <DeleteForeverRoundedIcon />
          <input type="button" style={{display: "none"}} id='delete' />
        </BoxAction>
        <BoxAction
          actionTip="Resize an Object"
          actionId="resize"
          currentAction={currentAction}
          setCurrentAction={setCurrentAction}
        >
          <CropFreeRoundedIcon />
          <input type="button" style={{display: "none"}} id='resize' />
        </BoxAction>
      </div>
      <div className={styles.actionGroup}>
        <BoxAction
          actionTip="Zoom In"
          actionId="zoom-in"
          currentAction={currentAction}
          setCurrentAction={setCurrentAction}
          onClick={handleZoomIn}
        >
          <ZoomInRoundedIcon />
          <input type="button" style={{display: "none"}} id='zoom-in' />
        </BoxAction>
        <BoxAction
          actionTip="Zoom Out"
          actionId="zoom-out"
          currentAction={currentAction}
          setCurrentAction={setCurrentAction}
          onClick={handleZoomOut}
        >
          <ZoomOutRoundedIcon />
          <input type="button" style={{display: "none"}} id='zoom-out' />
        </BoxAction>
      </div>
      <div className={styles.actionGroup}>
        <BoxAction
          actionTip="Customize this Box"
          actionId="customize-box"
          currentAction={currentAction}
          setCurrentAction={setCurrentAction}
        >
          <PaletteRoundedIcon />
          <input type="button" style={{display: "none"}} id='customize-box' />
        </BoxAction>
      </div>
    </div>
  )
}

export default BoxActionBar