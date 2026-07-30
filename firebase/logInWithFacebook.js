import { FacebookAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "./config";

export const logInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    await signInWithRedirect(auth, provider);
};
