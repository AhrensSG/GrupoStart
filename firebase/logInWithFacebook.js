import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

export const logInWithFacebook = async () => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
};