import { Merchandise } from "./merchandise.model";

export class Movement {
    constructor(
        public technicalId: number,
        public creationDateTime: Date,
        public creationUserName: string,
        public dateTime: Date,
        public declarationLocation: string,
        public merchandise: Merchandise
    ) { }
}