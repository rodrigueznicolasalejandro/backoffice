export interface ProductViewDto {
  id: number;
  name: string;
  brand: {id: number; name: string};
  paymentMethod: {id: number; name: string};
  paymentType: {id: number; name: string};
  currency: {id: number; code: string};
  financingType: {id: number; name: string};
  cardScope: {id: number; name: string};
  captureMethod: {id: number; name: string}
}
