export interface Supplier {
    id: string
    name: string
    cnpj: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

export interface CreateSupplierData {
    name: string
    cnpj: string
}

export interface UpdateSupplierData {
    name?: string
    cnpj?: string
} 