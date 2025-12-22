export interface ServiceDto {
  id: string;
  nombreServicio: string;
}

export interface ServiceCreateDto {
  nombreServicio: string;
}

export interface ServiceUpdateDto extends ServiceCreateDto {}

export interface ServiceViewDto extends ServiceDto {}
