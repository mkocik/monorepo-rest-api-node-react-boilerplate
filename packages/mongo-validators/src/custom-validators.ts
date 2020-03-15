import {Model} from "mongoose";
import {ValidationErrors} from "./validation-errors.enum";

export async function unique(key: string, model: Model<any>, value: string) {
  return model.find({[key]: value}).then(entities => {
    if (entities.length !== 0) {
      return Promise.reject(ValidationErrors.VALUE_IN_USE);
    }
  });
}

export async function exists(key: string, model: Model<any>, value: string) {
  return model.find({[key]: value}).then(entities => {
    if (entities.length === 0) {
      return Promise.reject(ValidationErrors.VALUE_DOES_NOT_EXIST);
    }
  });
}
