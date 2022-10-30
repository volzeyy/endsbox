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

function BoxActionBar() {
  return (
    <div className={styles.actionBar}>
      <div className={styles.actionGroup}>
        <BoxAction>
          <PanToolAltRoundedIcon />
          <input type="button" style={{display: "none"}} id='select' />
        </BoxAction>
        <BoxAction>
          <PanToolRoundedIcon />
          <input type="button" style={{display: "none"}} id='pan' />
        </BoxAction>
      </div>
      <div className={styles.actionGroup}>
        <BoxAction>
          <AddPhotoAlternateRoundedIcon />
          <input type="file" style={{display: "none"}} id='import-media' />
        </BoxAction>
      </div>
      <div className={styles.actionGroup}>
        <BoxAction>
          <DeleteForeverRoundedIcon />
          <input type="button" style={{display: "none"}} id='delete' />
        </BoxAction>
        <BoxAction>
          <CropFreeRoundedIcon />
          <input type="button" style={{display: "none"}} id='resize' />
        </BoxAction>
      </div>
      <div className={styles.actionGroup}>
        <BoxAction>
          <ZoomInRoundedIcon />
          <input type="button" style={{display: "none"}} id='zoom-in' />
        </BoxAction>
        <BoxAction>
          <ZoomOutRoundedIcon />
          <input type="button" style={{display: "none"}} id='zoom-out' />
        </BoxAction>
      </div>
      <div className={styles.actionGroup}>
        <BoxAction>
          <PaletteRoundedIcon />
          <input type="button" style={{display: "none"}} id='customize-box' />
        </BoxAction>
      </div>
    </div>
  )
}

export default BoxActionBar