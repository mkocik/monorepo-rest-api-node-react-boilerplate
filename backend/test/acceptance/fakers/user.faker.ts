import {IFaker} from "./interfaces/faker";
import faker from "faker"
import {User} from "../../../../packages/api-models";

class UserFaker implements IFaker {
  getData() {
    return {
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

  }

  create() {
    return User.create(this.getData());
  }
}

const UserFake: UserFaker = new UserFaker();

export {UserFake};
