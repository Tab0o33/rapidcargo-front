export class Merchandise {
    constructor(
        public referenceType: string,
        public referenceValue: number,
        public quantity: number,
        public weight: number,
        public totalQuantity: number,
        public totalWeight: number,
        public description: string
    ) { }
}