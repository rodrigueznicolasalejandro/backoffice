export interface PriceDto {
  id: number;
  nombre: string;
  idPricingProducto: string;
  rangoCuotaInferior: number | null;
  rangoCuotaSuperior: number | null;
  tipoPlazo: string;
  diasPlazo: number;
  tipoPrecio: string;
  valorArancel: string | null;
  valorPrecioFijoARS: number | null;
  valorPrecioFijoUSD: number | null;
  dateFrom: string | null;
  dateTo: string | null;
  idSubadquirente: number;
}

export interface PriceCreateDto {
  nombre: string;
  idPricingProducto: string;
  rangoCuotaInferior: number | null;
  rangoCuotaSuperior: number | null;
  tipoPlazo: string;
  diasPlazo: number;
  tipoPrecio: string;
  valorArancel: string | null;
  valorPrecioFijoARS: number | null;
  valorPrecioFijoUSD: number | null;
  dateFrom: string | null;
  dateTo: string | null;
  idSubadquirente: number;
}

export interface PriceUpdateDto {
  nombre?: string;
  idPricingProducto?: string;
  rangoCuotaInferior?: number | null;
  rangoCuotaSuperior?: number | null;
  tipoPlazo?: string;
  diasPlazo?: number;
  tipoPrecio?: string;
  valorArancel?: string | null;
  valorPrecioFijoARS?: number | null;
  valorPrecioFijoUSD?: number | null;
  dateFrom?: string | null;
  dateTo?: string | null;
  idSubadquirente?: number;
}

export interface PriceViewDto {
  id: number;
  nombre: string;
  idPricingProducto: string;
  rangoCuotaInferior: number | null;
  rangoCuotaSuperior: number | null;
  tipoPlazo: string;
  diasPlazo: number;
  tipoPrecio: string;
  valorArancel: string | null;
  valorPrecioFijoARS: number | null;
  valorPrecioFijoUSD: number | null;
  dateFrom: string | null;
  dateTo: string | null;
  idSubadquirente: number;
}
