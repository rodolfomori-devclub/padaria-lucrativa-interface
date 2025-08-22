export interface Family {
  id: string;
  name: string;
  profitParticipation: number;
  profitMargin: number;
  coefficient: number;
  contribution: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFamilyData {
  name: string;
  profitParticipation: number;
  profitMargin: number;
  coefficient: number;
  contribution: number;
}

export interface UpdateFamilyData {
  name?: string;
  profitParticipation?: number;
  profitMargin?: number;
  coefficient?: number;
  contribution?: number;
}
