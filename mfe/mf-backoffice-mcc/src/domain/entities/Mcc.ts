export interface Mcc {
  id: number;
  code: string;
  description: string;
  allows_tips: boolean;
}

export interface MccCreate {
  code: string;
  description: string;
  allows_tips: boolean;
}

export interface MccUpdate extends MccCreate {}
