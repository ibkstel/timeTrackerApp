import { createStore, combineReducers } from 'redux';
import {} from 'react-redux';
import { Data } from '../interfaces/Data';

const INITIAL_STATE: Array<Data> = [
    {
        Durations: [
            {
                startDate: new Date(-86400000 + new Date().getTime() + new Date().getTimezoneOffset() * 60000),
                endDate: new Date(-86400000 + new Date().getTime() + 100000 + new Date().getTimezoneOffset() * 60000),
            },
            {
                startDate: new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000),
                endDate: new Date(new Date().getTime() + 200000 + new Date().getTimezoneOffset() * 60000),
            },
        ],
        label: 'Gym',
    },
    {
        Durations: [
            {
                startDate: new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000),
                endDate: new Date(new Date().getTime() + 100000 + new Date().getTimezoneOffset() * 60000),
            },
            {
                startDate: new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000),
                endDate: new Date(new Date().getTime() + 100000 + new Date().getTimezoneOffset() * 60000),
            },
        ],
        label: 'School',
    },
];

interface Action {
    type: string;
    payload: Array<Data>;
}

const dataReducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case 'SET_DATA':
            let setData = action.payload;
            console.log(setData);
            return setData;
        default:
            console.log(state);
            return state;
    }
};

const INITIAL_STATE_TIMER: Array<boolean> = [];

interface ActionTimer {
    type: string;
    payload: Array<boolean>;
}

const timerReducer = (state = INITIAL_STATE_TIMER, action: ActionTimer) => {
    switch (action.type) {
        case 'SET_TIMER':
            let timer = action.payload;
            return timer;
        default:
            return state;
    }
};

export const store = createStore(combineReducers({ Data: dataReducer, Timer: timerReducer }));
