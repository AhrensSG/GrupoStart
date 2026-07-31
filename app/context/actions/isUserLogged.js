import { auth } from "@/firebase/config";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

const SERVER_URL_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_AUTH_ENDPOINT;

export const isUserLogged = async (dispatch) => {
    onAuthStateChanged(auth, async (user) => {
        try {
            if (user) {
                let role = "user";
                try {
                    const res = await axios.get(`/api/routes/users/role?uid=${user.uid}`);
                    role = res.data?.role || "user";
                } catch (_) {}

                const info = {
                    id: user.uid,
                    name: user.displayName,
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    role,
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
