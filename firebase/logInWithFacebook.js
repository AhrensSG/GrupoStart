import { FacebookAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth } from "./config";

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
};

export const logInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  if (isMobile()) {
    await signInWithRedirect(auth, provider);
    return null;
  }
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const getFacebookRedirectResult = () => getRedirectResult(auth);
