import React, { useEffect, useState } from "react";

import Logo from "../Logo";
import SignInButton from "../SignInButton";

import { useUserStore } from "../../stores/userStore";
import SignOutButton from "../SignOutButton";

function NavBar({className}) {
  const [isUser, setIsUser] = useState({});

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    setIsUser(user);
  }, [user]);

  return (
    <header className={className}>
      <Logo />
      {isUser ? <SignOutButton /> : <SignInButton />}
    </header>
  );
}

export default NavBar;
