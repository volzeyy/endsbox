import React, { useEffect, useState } from "react";

import DropDown from "../DropDown";

const UserAvatar = ({ className, user }) => {

  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    setLoggedInUser(user)
  }, [user])

  const handleToggleDropdown = () => {
    setIsDropDownActive(prev => !prev)
  }

  return (
    <>
        <div className={className}
            onClick={handleToggleDropdown}
        >
            {loggedInUser ?
                <img src={loggedInUser.photoURL} alt="User Profile Image" referrerPolicy="no-referrer" />
            :
                <img src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" alt="Default Profile Image" />
            }
        </div>
        {isDropDownActive ?
            <DropDown user={user} />
        : null}
    </>
  );
};

export default UserAvatar;
