import {db } from "../firebase"
import { collection, addDoc, onSnapshot, doc } from "@firebase/firestore";

export async function createCheckoutSession(uid) {
  const checkoutSessionRef = await addDoc(
    collection(doc(db, 'users', uid), 'checkout_sessions'), {
      price: "price_1MC6IRJoMpGSOaYHz5IFwRJt",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }
  )

  onSnapshot(checkoutSessionRef, async (doc) => {
    const { url } = doc.data()
    console.log(url)

    if (url) {
      window,location.assign(url)
    }
  })
}