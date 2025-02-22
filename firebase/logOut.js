import { signOut } from "firebase/auth";
import { auth } from "./config";
import { toast } from "sonner";

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    toast.error("Ocurrió un error al cerrar sesión.");
    return error;
  }
};
