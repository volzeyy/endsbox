import NavBar from "../NavBar";

export default function Layout({ className, children }) {
  return (
    <>
      <NavBar />
      <main className={className}>{children}</main>
    </>
  );
}
