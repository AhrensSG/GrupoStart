import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./config";
import { toast } from "sonner";

const SERVER_URL_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_AUTH_ENDPOINT;

export const logInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const credentials = await signInWithPopup(auth, provider);
        // const res = await axios.post(SERVER_URL_AUTH_ENDPOINT, credentials);
        // return res.data;
    } catch (error) {
        if (error.code === "auth/popup-closed-by-user") {
            console.warn("El usuario cerró el popup de Google sin completar el inicio de sesión.");
            toast.info("Popup cerrado. Por favor, intenta nuevamente.");
        } else {
            console.error("Error en logInWithGoogle:", error);
            toast.error("Ocurrió un error al autenticar.");
        }
        throw error; // Opcional: solo si quieres lanzar el error para manejarlo en otro lugar.
    }
};
