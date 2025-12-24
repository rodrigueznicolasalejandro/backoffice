import { AuthRepository } from "@domain/ports/repositories/auth.port";
import { User } from "@domain/entities/user.entity";

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(
    username: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }
    return await this.authRepository.login(username, password);
  }
}
