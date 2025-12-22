export interface AuthTokenDto {
  token: string;
  expiresIn: number;
}

export interface AuthUserDto {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface AuthResponseDto {
  success: boolean;
  token: string;
  user: AuthUserDto;
  expiresIn?: number;
  message?: string;
}
