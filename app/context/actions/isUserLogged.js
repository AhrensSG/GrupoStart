import { auth } from "@/firebase/config";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

const SERVER_URL_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_AUTH_ENDPOINT;

export const isUserLogged = async (dispatch) => {
    onAuthStateChanged(auth, async (user) => {
        try {
            if (user) {
                const info = {
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                };
                const data = await axios.put(`${SERVER_URL_AUTH_ENDPOINT}`, info);

                dispatch({ type: "LOGGED_IN_USER", payload: {info : data.data, isLoading: false} });
                return true;
            } else {
                dispatch({ type: "LOGGED_IN_USER", payload: {info : null, isLoading: false } });
                return false;
            }
        } catch (error) {
            return error;
        }
    });
};
