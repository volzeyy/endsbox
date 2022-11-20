import React, { useEffect, useState } from "react";

import { useUserStore } from "../../stores/userStore";

import Logo from "../Logo";
import UserAvatar from "../UserAvatar"

function NavBar({className}) {
  const user = useUserStore((state) => state.user);

  return (
    <header className={className}>
      <Logo />
      <UserAvatar user={user}/>
    </header>
  );
}

export default NavBar;
