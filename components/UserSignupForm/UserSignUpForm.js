import { Formik, Field, Form } from "formik";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

import { useUserStore } from "../../stores/userStore";

export default function UserSignUpForm({className}) {
  const user = useUserStore((state) => state.user);

  function validateUsername(value) {
    let error;
    if (!value) {
      error = "Username is Required"
    } else if (!/^[a-z0-9_-]{3,16}$/.test(value)) {
      error = 'Incompatible Username';
    }
    return error;
  }

  return (
    <div className={className}>
      <div className='form'>
        <h1>Create a Username</h1>
        <Formik
          initialValues={{ username: "" }}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));

            if (!user) {
              return;
            }
            
            const q = query(
              collection(db, "users"),
              where("username", "==", `${values.username}`)
            );
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty !== true) {
              alert("username exists");
              return;
            }

            const usersRef = doc(db, "users", `${user.uid}`);
            setDoc(
              usersRef,
              {
                username: values.username,
                email: user.email,
                name: user.displayName,
                provider: user.providerData[0].providerId,
                photoUrl: user.photoURL,
              },
              { merge: true }
            );

            console.log(`success! ${values.username} was created!`);
            useUserStore.getState().setUsername(values.username);
          }}
        >
          {({errors, touched, validateField}) => (
            <Form>
              {errors.username && touched.username && <div>{errors.username}</div> }
              <Field name='username' type='text' validate={validateUsername} />
              <button type='submit' onClick={() => validateField('username')}>Create</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
