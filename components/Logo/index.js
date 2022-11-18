import React from "react";
import styles from "./index.module.css";

function Logo() {
  const goToProductPage = () => {
    console.log("hello");
  };

  return (
    <div className={styles.logoContainer} onClick={goToProductPage}>
      <div className={styles.logoImage}>
        <img src='/eternebox.png' alt='logo' />
      </div>
      <div className={styles.logoText}>eterneBox</div>
    </div>
  );
}

export default Logo;
