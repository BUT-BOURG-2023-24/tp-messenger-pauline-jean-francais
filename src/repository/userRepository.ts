import UserModel, {IUser} from "../database/Mongo/Models/UserModel";
class UserRepository {

    public createUser(newUser: IUser): Promise<IUser | null> {
        return UserModel.create(newUser);
    }

    public getUserById(userId: string): Promise<IUser | null> {
        return UserModel.findById(userId).exec();
    }

    public getUserByName(username: string): Promise<IUser | null> {
        return UserModel.findOne({ username });
    }

    public getUsersbyIds(listeIds: string[]): Promise<IUser[] | null> {
        return UserModel.find({ _id: { $in: listeIds } });
    }
    public getAllUsers(): Promise<IUser[] | null> {
        return UserModel.find();
    }
    
}

export default UserRepository;