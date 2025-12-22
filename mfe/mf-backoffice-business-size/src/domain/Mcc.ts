export interface Mcc {
  id: number;
  code: string;
  description: string;
  allows_tips: boolean;
  allows_cashback: boolean;
  allows_incremental_authorization: boolean;
}

export interface MccCreate {
  code: string;
  description: string;
  allows_tips: boolean;
  allows_cashback: boolean;
  allows_incremental_authorization: boolean;
}

export interface MccUpdate extends MccCreate {}
