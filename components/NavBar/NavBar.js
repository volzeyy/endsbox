import { ViewInArRounded, WidgetsRounded } from "@mui/icons-material";
import Link from "next/link";
import React, { useState, useEffect} from "react";

import { useUserStore } from "../../stores/userStore";

import Logo from "../Logo";
import UserAvatar from "../UserAvatar"

function NavBar({className}) {
  const user = useUserStore((state) => state.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <header className={className}>
      <Logo />
      <div className="right-side">
        <Link href="/sandbox"><WidgetsRounded /></Link>
        {isLoaded && user && user.hasOwnProperty("username") ? <Link href={`/box/${user.username}`}><ViewInArRounded /></Link> : null}
        <UserAvatar user={user}/>
      </div>
    </header>
  );
}

export default NavBar;
