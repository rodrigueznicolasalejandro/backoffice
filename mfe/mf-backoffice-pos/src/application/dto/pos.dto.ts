export interface PosDto {
  id: string;
  marca: string;
  modelo: string;
  nombre: string;
}

export interface PosCreateDto {
  id: string;
  marca: string;
  modelo: string;
  nombre: string;
}

export interface PosUpdateDto {
  marca?: string;
  modelo?: string;
  nombre?: string;
}

export interface PosViewDto {
  id: string;
  marca: string;
  modelo: string;
  nombre: string;
}
