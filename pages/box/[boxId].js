import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { MainContainer } from "../../styles/BoxPage.style";

import BoxView from "../../components/BoxView";
import PropertyBar from "../../components/PropertyBar";
import ToolBar from "../../components/ToolBar";

import { useToolStore } from "../../stores/toolStore";
import { useUserStore } from "../../stores/userStore";

import usePremiumStatus from "../../stripe/usePremiumStatus";

import { listAll, ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebaseClient";

export default function BoxPage() {
  const user = useUserStore((state) => state.user);
  const userIsPremium = usePremiumStatus(user);
  const selectedTool = useToolStore((state) => state.selectedTool);
  const router = useRouter();
  const { boxId } = router.query;

  const isFirstRender = useRef(true);

  const [box, setBox] = useState({
    owner: boxId,
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
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const getStoredImages = async () => {
      try {
        console.log("stored images")
        let imageListRef = ref(storage, `boxes/${boxId}/`);
        let res = await listAll(imageListRef);
        res.items.forEach((item) => {
          getDownloadURL(item).then(async (res) => {
            const docRef = doc(db, "objects", item.name);
            const docSnap = await getDoc(docRef);
            const backgroundDocRef = doc(db, "backgrounds", item.name)
            const backgroundSnap = await getDoc(backgroundDocRef)
            if (docSnap.exists()) {
              const data = docSnap.data();
              let image = new Image();
              image.src = res;
              image.onload = () => {
                setBox((prev) => {
                  return {
                    ...prev,
                    objects: [
                      ...prev.objects,
                      {
                        id: data.id,
                        src: res,
                        position: {
                          x: data.position.x,
                          y: data.position.y,
                        },
                        width: data.width,
                        height: data.height,
                        index: prev.objects.length,
                        type: data.type,
                      },
                    ],
                  };
                });
              };
            } 

            if (backgroundSnap.exists()) {
              const data = backgroundSnap.data();
              setBox(prev => {
                return {...prev,
                  background: {
                    ...prev.background,
                    ...data,
                    image: res,
                  }
                }
              })
            }
          });
        });
      } catch (err) {
        alert("Error Loading in Images I suppose")
      }
    };

    getStoredImages();

    return () => {
      setBox((prev) => {
        return {
          ...prev,
          owner: boxId,
          objects: [],
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
        };
      });
    };
  }, [boxId]);

  return (
    <MainContainer toolbar={true}>
      <Head>
        <title>{boxId ? boxId : "Loading..."}</title>
        <meta name="viewport" content="width=device-width, minimum-scale=1.0" />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {isFirstRender.current === false ?
        <>
          <BoxView box={box} setBox={setBox} />
          {user?.username === boxId && userIsPremium ?
            <PropertyBar
              box={box}
              setBox={setBox}
              show={selectedTool === "customize-box" ? true : false}
            />
          : null}
          <ToolBar
            box={box}
            setBox={setBox}
            show={selectedTool === "customize-box" ? true : false}
          />
        </>
      :
        <h1>Loading...</h1>
      }
    </MainContainer>
  );
}
