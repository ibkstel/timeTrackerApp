import { UserData } from '../interfaces/Data';

export const setTimer = (key: Array<boolean>) => ({
    type: 'SET_TIMER',
    payload: key,
});

export const setUserData = (key: UserData) => ({
    type: 'SET_DATA',
    payload: key,
});
