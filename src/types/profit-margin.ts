export interface ProfitMargin {
  id: string;
  cardPercentage: number;
  lossPercentage: number;
  cardTaxPercentage: number;
  breakagePercentage: number;
  packagingPercentage: number;
  expectedTaxPercentage?: number;
  ownManufacturingSharePercentage?: number;
  resaleProductsSharePercentage?: number;
  expectedNetMarginPercentage?: number;
  averageResaleProductsMarginPercentage?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProfitMarginData {
  cardPercentage: number;
  lossPercentage: number;
  cardTaxPercentage: number;
  breakagePercentage: number;
  packagingPercentage: number;
  expectedTaxPercentage?: number;
  ownManufacturingSharePercentage?: number;
  resaleProductsSharePercentage?: number;
  expectedNetMarginPercentage?: number;
  averageResaleProductsMarginPercentage?: number;
}

export interface UpdateProfitMarginData {
  cardPercentage?: number;
  lossPercentage?: number;
  cardTaxPercentage?: number;
  breakagePercentage?: number;
  packagingPercentage?: number;
  expectedTaxPercentage?: number;
  ownManufacturingSharePercentage?: number;
  resaleProductsSharePercentage?: number;
  expectedNetMarginPercentage?: number;
  averageResaleProductsMarginPercentage?: number;
}
