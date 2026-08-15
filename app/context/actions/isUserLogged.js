import { auth } from "@/firebase/config";
import axios from "axios";
import { onIdTokenChanged } from "firebase/auth";
import { setAuthToken } from "@/lib/auth/token";

const SERVER_URL_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_AUTH_ENDPOINT;

async function refreshSessionCookie(token) {
    try {
        await axios.post("/api/auth/session", null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (err) {
        console.error("Error al refrescar sesión:", err);
    }
}

export const isUserLogged = (dispatch) => {
    return onIdTokenChanged(auth, async (user) => {
        try {
            if (user) {
                const token = await user.getIdToken();
                setAuthToken(token);
                await refreshSessionCookie(token);

                const info = {
                    id: user.uid,
                    name: user.displayName,
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    role: undefined,
                };
                dispatch({ type: "LOGGED_IN_USER", payload: { info, isLoading: true } });

                let role = "user";
                try {
                    const res = await axios.get("/api/routes/users/role");
                    role = res.data?.role || "user";
                } catch (_) {}

                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: { info: { ...info, role }, isLoading: false },
                });

                try {
                    await axios.put(`${SERVER_URL_AUTH_ENDPOINT}`, {
                        displayName: user.displayName,
                        email: user.email,
                    });
                } catch (_) {}
            } else {
                setAuthToken(null);
                axios.delete("/api/auth/session").catch(() => {});
                dispatch({ type: "LOGGED_IN_USER", payload: { info: null, isLoading: false } });
            }
        } catch (error) {
            console.error("Error en isUserLogged:", error);
            setAuthToken(null);
            dispatch({ type: "LOGGED_IN_USER", payload: { info: null, isLoading: false } });
        }
    });
};
