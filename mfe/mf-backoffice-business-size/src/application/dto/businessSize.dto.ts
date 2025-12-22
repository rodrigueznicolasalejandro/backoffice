export interface BusinessSizeDto {
  id: number;
  name: string;
  isActive: boolean;
}

export interface BusinessSizeCreateDto {
  name: string;
  isActive?: boolean;
}

export interface BusinessSizeUpdateDto extends BusinessSizeCreateDto {}

export interface BusinessSizeViewDto extends BusinessSizeDto {}
