import User from "../../models/User";

interface IUserState {
    user: User | null;
    token: string | null;
}

export default IUserState;