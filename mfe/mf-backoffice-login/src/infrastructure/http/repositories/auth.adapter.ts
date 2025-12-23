import { AuthRepository } from "@domain/ports/repositories/auth.port";
import { User } from "@domain/entities/user.entity";
import { httpClient } from "../../config/httpClient";

export class HttpAuthRepository implements AuthRepository {
  async login(
    username: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    const { data } = await httpClient.post<{
      success: boolean;
      data: { user: User; jwt_token: string };
    }>("/auth/login", {
      username,
      password,
    });

    return {
      user: data.data.user,
      token: data.data.jwt_token,
    };
  }
}
