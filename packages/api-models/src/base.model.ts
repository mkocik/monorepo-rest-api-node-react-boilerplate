import {Model, UserDbModel} from "@monorepo-boilerplate/db";
import {IModel} from "./interfaces/model.interface";

export class BaseModel implements IModel {
    protected model: Model<any>;

    constructor(model: Model<any>) {
        this.model = model;
    }

    async create(data: any) {
        const user = await new UserDbModel(data);
        return user.save();
    }

    find() {
        return this.model.find();
    }

    findById(id: any | string | number) {
        return this.model.findById(id);
    }

    findByIdAndRemove(id: any | string | number) {
        return this.model.findByIdAndRemove(id);
    }

    findByIdAndUpdate(id: any | string | number, update: any) {
        return this.model.findByIdAndUpdate(id, update, {new: true});
    }

    deleteOne(query: any = {}) {
        return this.model.deleteOne(query);
    }

    delete(query: any = {}) {
        return this.model.deleteMany(query);
    }
}
