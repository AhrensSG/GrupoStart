import { auth } from "@/firebase/config";
import axios from "axios";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";

const SERVER_URL_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_AUTH_ENDPOINT;

export const isUserLogged = async (dispatch) => {
    try {
        const result = await getRedirectResult(auth)
        if (result?.user) {
            const info = {
                id: result.user.uid,
                name: result.user.displayName,
                displayName: result.user.displayName,
                email: result.user.email,
                uid: result.user.uid,
            }
            dispatch({ type: "LOGGED_IN_USER", payload: { info, isLoading: false } })
            try {
                await axios.put(`${SERVER_URL_AUTH_ENDPOINT}`, {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    uid: result.user.uid,
                })
            } catch (_) {}
            return true
        }
    } catch (redirectError) {
        console.error("Error en redirect auth:", redirectError)
    }

    onAuthStateChanged(auth, async (user) => {
        try {
            if (user) {
                const info = {
                    id: user.uid,
                    name: user.displayName,
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                }
                dispatch({ type: "LOGGED_IN_USER", payload: { info, isLoading: false } })

                try {
                    await axios.put(`${SERVER_URL_AUTH_ENDPOINT}`, {
                        displayName: user.displayName,
                        email: user.email,
                        uid: user.uid,
                    })
                } catch (_) {}
                return true
            } else {
                dispatch({ type: "LOGGED_IN_USER", payload: { info: null, isLoading: false } })
                return false
            }
        } catch (error) {
            return error
        }
    })
}
