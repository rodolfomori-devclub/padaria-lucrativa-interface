export const calculateUnitCost = (totalCost: number, yeild: number): number => {
    return yeild > 0 ? totalCost / yeild : 0
}