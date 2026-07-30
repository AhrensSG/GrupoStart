import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./config";

export const logInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
};
