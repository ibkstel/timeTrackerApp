import { Data, Dates } from '../interfaces/Data';

export const setTimer = (key: Array<boolean>) => ({
    type: 'SET_TIMER',
    payload: key,
});

export const setData = (key: Array<Data>) => ({
    type: 'SET_DATA',
    payload: key,
});
