import {IUser, UserDbModel} from "@monorepo-boilerplate/db";
import {BaseModel} from "../base.model";
import {Model} from "mongoose";

class UserModel extends BaseModel {
    constructor(model: Model<IUser>) {
        super(model);
    }
}

const User: UserModel = new UserModel(UserDbModel);

export {User};
