import React, { useEffect, useState } from "react";

import DropDown from "../DropDown";

const UserAvatar = ({ className, user }) => {
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropDownActive((prev) => !prev);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <div className={className} onClick={handleToggleDropdown}>
        {isLoaded && user ? (
          <img
            src={user.photoURL}
            alt='User Profile Image'
            referrerPolicy='no-referrer'
          />
        ) : (
          <img
            src='https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
            alt='Default Profile Image'
          />
        )}
      </div>
      {isDropDownActive ? <DropDown user={user} /> : null}
    </>
  );
};

export default UserAvatar;
