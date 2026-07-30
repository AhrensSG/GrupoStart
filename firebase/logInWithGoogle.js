import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "./config";

export const logInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
};
