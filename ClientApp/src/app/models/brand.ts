export default class BRAND_DIM {
    public BRAND_ID: number
    public BRAND: string
    public ADD_DATE: Date
    public UPDATE_DATE: Date

    constructor(
        BRAND_ID_: number,
        BRAND_: string,
        ADD_DATE_: Date,
        UPDATE_DATE_: Date
    ) {
        this.BRAND_ID = BRAND_ID_
        this.BRAND = BRAND_
        this.ADD_DATE = ADD_DATE_
        this.UPDATE_DATE = UPDATE_DATE_
    }
}
