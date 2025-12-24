export interface Service {
  id: string;
  nombreServicio: string;
}

export type ServiceCreate = Omit<Service, 'id'>;
export type ServiceUpdate = ServiceCreate;
