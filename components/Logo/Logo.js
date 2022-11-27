import React from "react";
import Link from "next/link";

function Logo({className}) {
  return (
    <Link href="/">
      <div className={className}>
        <div className="img-container">
          <img src='/eternebox.png' alt='logo' />
        </div>
        <div>eterneBox</div>
      </div>
    </Link>
  );
}

export default Logo;
