import axios from "axios";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";

const SERVER_URL_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_AUTH_ENDPOINT; //Inicia sesion este codigo directamente falta el ID facebook de desarrolladores

export const logInWithFacebook = async () => {
  try {
    const auth = getAuth(); // Inicializa la autenticación
    const provider = new FacebookAuthProvider();
    provider.addScope("email"); // Agrega permisos adicionales, si es necesario

    // Realiza la autenticación con Facebook
    const credentials = await signInWithPopup(auth, provider);

    // Extrae el token de acceso de Facebook
    const { accessToken } = FacebookAuthProvider.credentialFromResult(credentials);

    // Opcional: Impresion del token en desarrollo para verificación
    console.log("Access Token:", accessToken);

    // Enviar las credenciales al servidor
    const res = await axios.post(SERVER_URL_AUTH_ENDPOINT, { accessToken });
    toast.success("Autenticación con Facebook exitosa!");

    return res.data; // Respuesta del servidor
    } catch (error) {
    // Manejo de errores
    console.error("Error al autenticar con Facebook:", error);
    toast.error("Ocurrió un error al autenticar con Facebook.");

    if (error.code === "auth/popup-closed-by-user") {
        toast.info("El usuario cerró la ventana de autenticación.");
    }

    return error;
    }
};