/**
 * @param startTime The start time of the event
 * @param endTime The end time of the event
 * @returns The number difference of the two events in milliseconds taking in account the timezone offset 
 */

export const getDuration = (startTime: Date, endTime: Date) => {
    return endTime.getTime() - startTime.getTime()  + new Date().getTimezoneOffset() * 60000;
}

/**
 * @param startTime The start time of the event
 * @param endTime The end time of the event
 * @returns The number difference of the two events in milliseconds 
 */

export const getDiff = (startTime: Date, endTime: Date) => {
    return endTime.getTime() - startTime.getTime();
}