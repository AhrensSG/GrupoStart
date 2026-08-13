import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth } from "./config";

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
};

export const logInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  if (isMobile()) {
    await signInWithRedirect(auth, provider);
    return null;
  }
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const getGoogleRedirectResult = () => getRedirectResult(auth);
