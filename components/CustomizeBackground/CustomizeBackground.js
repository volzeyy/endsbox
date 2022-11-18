import React, { useEffect, useState } from "react";

function CustomizeBackground({ box, setBox }) {
  const handleBackgroundChange = (e) => {
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

  const handleBackgroundUpload = (e) => {
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
        setBox((prev) => {
          return {
            ...prev,
            background: {
              ...prev.background,
              image: `url(${reader.result})`,
            },
          };
        });
      };
    };
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
      <label htmlFor='set-background-color' onChange={handleBackgroundChange}>
        Change Background Color
        <input
          type='color'
          id='set-background-color'
          value={box.background.color}
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
