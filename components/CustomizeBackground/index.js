import React from 'react'

import styles from "./index.module.css"

function CustomizeBackground({box, setBox}) {
  
  const handleBackgroundChange = (e) => {
    e.preventDefault()

    setBox(prev => {
        return {...prev,
            background: {
                ...prev.background,
                color: e.target.value,
            }
        }
    })
  }

  const handleBackgroundUpload = (e) => {
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
        setBox(prev => {
            return {...prev,
                background: {
                    ...prev.background,
                    image: `url(${reader.result})`,
                    position: 'center',
                }
            }
        })
      }
    }
  }

  const handleRepeatChange = (e) => {
    setBox(prev => {
        return {...prev,
            background: {
                ...prev.background,
                repeat: e.target.value,
            }
        }
    })
  }

  const handleBlendModeChange = (e) => {
    setBox(prev => {
        return {...prev,
            background: {
                ...prev.background,
                blendMode: e.target.value,
            }
        }
    })
  }

  const handleBackgroundSizeChange = (e) => {
    setBox(prev => {
        return {...prev,
            background: {
                ...prev.background,
                size: e.target.value,
            }
        }
    })
  }

  return (
    <>
        <label htmlFor="set-background-color" className={styles.input} onChange={handleBackgroundChange}>
            Change Background Color
            <input type="color" id="set-background-color"></input>
        </label>
        <label htmlFor="set-background-image" className={styles.input}>
            Upload Background Image
            <input type="file" id="set-background-image" onChange={handleBackgroundUpload}></input>
        </label>
        <label htmlFor="set-background-repeat" className={styles.input}>
            Background Repeat
            <select id="set-background-repeat" onChange={handleRepeatChange}>
                <option value="repeat">repeat</option>
                <option value="repeat-x">repeat x</option>
                <option value="repeat-y">repeat y</option>
                <option value="no-repeat">no repeat</option>
                <option value="space">space</option>
                <option value="round">round</option>
            </select>
        </label>
        <label htmlFor="set-background-blend-mode" className={styles.input}>
            Background Blend Mode
            <select id="set-background-blend-mode" onChange={handleBlendModeChange}>
                <option value="normal">normal</option>
                <option value="multiply">multiply</option>
                <option value="screen">screen</option>
                <option value="overlay">overlay</option>
                <option value="darken">darken</option>
                <option value="lighten">lighten</option>
                <option value="color-dodge">color dodge</option>
                <option value="saturation">saturation</option>
                <option value="color">color</option>
                <option value="luminosity">lighten</option>
            </select>
        </label>
        <label htmlFor="set-background-size" className={styles.input}>
            Background Size
            <select id="set-background-size" onChange={handleBackgroundSizeChange}>
                <option value="auto">auto</option>
                <option value="cover">cover</option>
                <option value="contain">contain</option>
                <option value="initial">initial</option>
            </select>
        </label>
    </>
  )
}

export default CustomizeBackground