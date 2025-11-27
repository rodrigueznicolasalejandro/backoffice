type BusinessSizeName = 'INDIVIDUAL' | 'MICRO' | 'SMALL';


export interface BusinessSize {
  id: number;
  name: BusinessSizeName; 
  isActive: boolean;
}