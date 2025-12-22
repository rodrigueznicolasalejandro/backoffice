export interface UserHeaderDto {
  id: number;
  username: string;
  email: string;
  avatar?: string;
}

export interface NotificationDto {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  timestamp: string;
}

export interface HeaderStateDto {
  user: UserHeaderDto | null;
  notifications: NotificationDto[];
  unreadCount: number;
}
