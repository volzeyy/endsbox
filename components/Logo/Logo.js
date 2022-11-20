import React from "react";

function Logo({className}) {
  return (
    <div className={className}>
      <div className="img-container">
        <img src='/eternebox.png' alt='logo' />
      </div>
      <div>eterneBox</div>
    </div>
  );
}

export default Logo;
