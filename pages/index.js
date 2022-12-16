import { useEffect, useState } from "react";
import Head from "next/head";

import {isMobile} from 'react-device-detect';

import data from "../helpers/productPageData";

import BoxView from "../components/BoxView";
import PropertyBar from "../components/PropertyBar";
import ToolBar from "../components/ToolBar";

import { useToolStore } from "../stores/toolStore";
import { MainContainer } from "../styles/Home.style";

export default function Home() {
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
    objects: data,
    scale: 0.6,
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
        <title>endsbox</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
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