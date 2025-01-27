import axios from "axios";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { auth } from "./config";

const SERVER_URL_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_AUTH_ENDPOINT; //Inicia sesion este codigo directamente falta el ID facebook de desarrolladores

export const logInWithFacebook = async () => {
    try {
        const provider = new FacebookAuthProvider();
        const credentials = await signInWithPopup(auth, provider);
        const res = await axios.post(SERVER_URL_AUTH_ENDPOINT, credentials);
        return res.data;
    } catch (error) {
        toast.error("Error al iniciar sesion con facebook");
        console.log(error);

        return error;
    }
};
