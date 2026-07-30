import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./config";

export const logInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
};
