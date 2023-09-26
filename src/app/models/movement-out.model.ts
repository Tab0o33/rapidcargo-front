import { Merchandise } from "./merchandise.model";
import { Movement } from "./movement.model";

export class MovmentOut extends Movement {
    constructor(
        technicalId: number,
        creationDateTime: Date,
        creationUserName: string,
        dateTime: Date,
        declarationLocation: string,
        merchandise: Merchandise,
        public warehouseCode: string,
        public warehouseLabel: string,
        public customsStatus: string,
        public documentType: string,
        public documentRef: number,
    ) {
        super(technicalId, creationDateTime, creationUserName, dateTime, declarationLocation, merchandise);
    }
}

