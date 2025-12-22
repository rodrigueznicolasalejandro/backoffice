export interface MccDto {
  id: number;
  code: string;
  description: string;
  allows_tips: boolean;
}

export interface MccCreateDto {
  code: string;
  description: string;
  allows_tips: boolean;
}

export interface MccUpdateDto extends MccCreateDto {}

export interface MccViewDto extends MccDto {}
