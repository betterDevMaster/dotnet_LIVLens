export default class EVENT_DIM {
    public EVENT_ID: number
    public EVENT_NAME: string
    public CITY: string
    public STATE: string
    public COUNTRY: string
    public COURSE_NAME: string
    public EVENT_DATE: Date
    public ADD_DATE: Date
    public UPDATE_DATE: Date

    constructor(
        EVENT_ID_: number,
        EVENT_NAME_: string,
        CITY_: string,
        STATE_: string,
        COUNTRY_: string,
        COURSE_NAME_: string,
        EVENT_DATE_: Date,
        ADD_DATE_: Date,
        UPDATE_DATE_: Date
    ) {
        this.EVENT_ID = EVENT_ID_
        this.EVENT_NAME = EVENT_NAME_
        this.CITY = CITY_
        this.STATE = STATE_
        this.COUNTRY = COUNTRY_
        this.COURSE_NAME = COURSE_NAME_
        this.EVENT_DATE = EVENT_DATE_
        this.ADD_DATE = ADD_DATE_
        this.UPDATE_DATE = UPDATE_DATE_
    }
}
