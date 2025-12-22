import { User } from "@domain/entities/user.entity";

export interface AuthRepository {
  login(username: string, password: string): Promise<{ user: User; token: string }>;
}
