import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
export const SignUpUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed up:", user);
      return user;
    })
    .catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage);

  });
}

export const SignInUser = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
    } catch (error) {
       if (error instanceof Error) {
        console.error("Error logging in:", error.message);
        alert(error.message);
      }
    }
}