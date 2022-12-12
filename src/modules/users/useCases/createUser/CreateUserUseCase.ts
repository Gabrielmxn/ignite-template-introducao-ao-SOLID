import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    if (name === undefined || email === undefined) {
      throw new Error("Os dados do e-mail e nome estão vazios.");
    }
    const existEmail = this.usersRepository.findByEmail(email);

    if (existEmail) {
      throw new Error("Email already exists");
    }

    const user = this.usersRepository.create({ email, name });

    return user;
  }
}

export { CreateUserUseCase };
