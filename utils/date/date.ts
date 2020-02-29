import { Data } from '../../interfaces/Data';
import moment from 'moment';

/**
 * @param date1 First Date
 * @param date2 Second Date
 * @returns True if the two dates are on the same day, otherwise false
 */

export const sameDay = (date1: Date, date2: Date) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

/**
 * @param date1 First Date
 * @param date2 Second Date
 * @returns True if the two dates are on the exact same date, otherwise false
 */

export const sameDate = (date1: Date, date2: Date) => {
    return date1.getTime() === date2.getTime();
};

/**
 * Format the data to be used in a section list by grouping.
 * @param dates The dates interface of the user
 * @returns The section list formatted data
 */

export const groupDates = (dates: Data) => {
    let sections = [];
    const Durations = dates.Durations;
    let i = 0;
    while (i < Durations.length) {
        let date = Durations[i];
        let obj = {
            title: moment(date.startDate).format('DD:MM:YYYY'),
            data: [date],
        };
        i++;
        while (i < Durations.length && sameDay(date.startDate, Durations[i].startDate)) {
            obj.data.push(Durations[i]);
            i++;
        }
        sections.push(obj);
    }
    return sections;
};
