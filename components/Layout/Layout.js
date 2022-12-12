import { useState, useEffect } from "react";
import NavBar from "../NavBar";
import { useUserStore } from "../../stores/userStore";
import UserSignUpForm from "../UserSignupForm";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Layout({ children }) {
  const user = useUserStore((state) => state.user);

  const [isShowUsernameSignup, setIsShowUsernameSignup] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (user && !user.username) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          useUserStore.getState().setUsername(data.username);
          setIsShowUsernameSignup(false);
          return;
        }
        setIsShowUsernameSignup(true);
        return;
      }

      setIsShowUsernameSignup(false);
    };

    fetchUser();
  }, [user]);

  return (
    <>
      <NavBar />
      {isShowUsernameSignup ? <UserSignUpForm /> : children}
    </>
  );
}
