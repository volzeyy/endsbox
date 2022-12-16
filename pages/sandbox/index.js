import { useState, useEffect } from "react";
import Head from "next/head";
import {isMobile} from 'react-device-detect';

import { MainContainer } from "../../styles/BoxPage.style";

import BoxView from "../../components/BoxView";
import PropertyBar from "../../components/PropertyBar";
import ToolBar from "../../components/ToolBar";

import { useToolStore } from "../../stores/toolStore";

export default function BoxPage() {
  const selectedTool = useToolStore((state) => state.selectedTool);

  const [mobile, setMobile] = useState(false)
  const [box, setBox] = useState({
    owner: "",
    background: {
      position: {
        x: 0,
        y: 0,
      },
      color: "",
      image: "",
      repeat: "repeat",
      size: "cover",
      blendMode: "",
    },
    objects: [],
    scale: 0.2,
    position: { x: 0, y: 0 },
    selectedObjectId: "",
  });

  useEffect(() => {
    setMobile(isMobile)
  }, [setMobile])

  return (
    <MainContainer
      toolbar={true}
    >
      <Head>
        <title>sandbox</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=no" />
        <link rel='icon' href='/favicon.ico' />
      </Head>
        <>
          <BoxView box={box} setBox={setBox} isSandbox />
          <PropertyBar isSandbox box={box} setBox={setBox} mobile={mobile} show={ selectedTool === "customize-box" ? true : false } />
          <ToolBar isSandbox setBox={setBox} mobile={mobile} show={ selectedTool === "customize-box" ? true : false } />
        </>
    </MainContainer>
  );
}
