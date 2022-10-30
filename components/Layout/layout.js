import NavBar from '../NavBar'
import BoxActionBar from '../BoxActionBar'
import Footer from '../Footer'

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <BoxActionBar />
      <Footer />
    </>
  )
}