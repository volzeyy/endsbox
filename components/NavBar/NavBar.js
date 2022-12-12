import { ViewInArRounded, WidgetsRounded } from "@mui/icons-material";
import Link from "next/link";

import { useUserStore } from "../../stores/userStore";

import usePremiumStatus from "../../stripe/usePremiumStatus";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase"

import Logo from "../Logo";
import UserAvatar from "../UserAvatar";

function NavBar({ className }) {
  const userState = useUserStore((state) => state.user);
  const [user, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(user);

  return (
    <header className={className}>
      <Logo />
      <div className='right-side'>
        <Link href='/sandbox'>
          <WidgetsRounded />
        </Link>
        {!userLoading && userState?.username && userIsPremium ? (
          <Link href={`/box/${userState?.username}`}>
            <ViewInArRounded />
          </Link>
        ) : null}
        <UserAvatar user={userState} userIsPremium={userIsPremium} />
      </div>
    </header>
  );
}

export default NavBar;
