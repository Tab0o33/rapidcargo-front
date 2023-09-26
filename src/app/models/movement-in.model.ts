import { Merchandise } from "./merchandise.model";
import { Movement } from "./movement.model";

export class MovmentIn extends Movement {
    constructor(
        technicalId: number,
        creationDateTime: Date,
        creationUserName: string,
        dateTime: Date,
        declarationLocation: string,
        merchandise: Merchandise,
        public warehouseCode: string,
        public warehouseLabel: string,
        public customsStatus: string
    ) {
        super(technicalId, creationDateTime, creationUserName, dateTime, declarationLocation, merchandise);
    }
}

