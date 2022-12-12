import { useState } from "react";
import Head from "next/head";

import { MainContainer } from "../../styles/BoxPage.style";

import BoxView from "../../components/BoxView";
import PropertyBar from "../../components/PropertyBar";
import ToolBar from "../../components/ToolBar";

import { useToolStore } from "../../stores/toolStore";

export default function BoxPage() {
  const selectedTool = useToolStore((state) => state.selectedTool);

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

  return (
    <MainContainer
      toolbar={true}
    >
      <Head>
        <title>sandbox</title>
        <meta name="viewport" content="width=device-width, minimum-scale=1.0" />
        <link rel='icon' href='/favicon.ico' />
      </Head>
        <>
          <BoxView box={box} setBox={setBox} isSandbox />
          <PropertyBar isSandbox box={box} setBox={setBox} show={ selectedTool === "customize-box" ? true : false } />
          <ToolBar isSandbox setBox={setBox} show={ selectedTool === "customize-box" ? true : false } />
        </>
    </MainContainer>
  );
}
