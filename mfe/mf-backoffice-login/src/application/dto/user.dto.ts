export interface UserDto {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  success: boolean;
  token: string;
  user: UserDto;
  message?: string;
}

export interface UserViewDto extends UserDto {}
