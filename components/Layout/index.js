import NavBar from "../NavBar";
import Footer from "../Footer";

import styles from "./index.module.css";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main className={styles.main}>{children}</main>
    </>
  );
}
