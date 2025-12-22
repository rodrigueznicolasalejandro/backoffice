export interface MenuItemDto {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: MenuItemDto[];
}

export interface NavigationDto {
  items: MenuItemDto[];
}
