import UserModel from '@/models/user.model';

interface IUserState {
    user: UserModel | null;
    token: string | null;
}

export default IUserState;
