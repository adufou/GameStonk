import authApi from "../../http/api/auth/authApi";
import store from "../globalStore";
import { setUser } from "./userReducer";

export async function fetchUser() {
    const userResponse = await authApi.getUser();
    if (userResponse.status === 200) {
        store.dispatch(setUser(userResponse.body))
    }
}