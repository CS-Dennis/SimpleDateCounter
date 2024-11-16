import moment from "moment";

export type MyDate = {
    dateTitle: string,
    date: moment.Moment;
    created: moment.Moment;
    modified: moment.Moment;
};