import { ViewInArRounded, WidgetsRounded } from "@mui/icons-material";
import Link from "next/link";

import { useUserStore } from "../../stores/userStore";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase"

import Logo from "../Logo";
import UserAvatar from "../UserAvatar";

function NavBar({ className }) {
  const userState = useUserStore((state) => state.user);
  const [user, userLoading] = useAuthState(auth);

  return (
    <header className={className}>
      <Logo />
      <div className='right-side'>
        <Link href='/sandbox'>
          <WidgetsRounded />
        </Link>
        {!userLoading && userState?.username ? (
          <a href={`/box/${userState?.username}`}>
            <ViewInArRounded />
          </a>
        ) : null}
        <UserAvatar user={userState} />
      </div>
    </header>
  );
}

export default NavBar;
