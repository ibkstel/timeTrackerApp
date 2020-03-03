import { createStore, combineReducers } from 'redux';
<<<<<<< Updated upstream
import {} from 'react-redux';
=======
>>>>>>> Stashed changes
import { UserData } from '../interfaces/Data';

const INITIAL_STATE: UserData = {
    Data: [
        {
            Durations: [
                /*     {
                    startDate: new Date(-86400000 + new Date().getTime() + new Date().getTimezoneOffset() * 60000),
                    endDate: new Date(
                        -86400000 + new Date().getTime() + 100000 + new Date().getTimezoneOffset() * 60000,
                    ),
                    active: false,
                    id: 0,
                },
                {
                    startDate: new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000),
                    endDate: new Date(new Date().getTime() + 200000 + new Date().getTimezoneOffset() * 60000),
                    active: false,
                    id: 1,
                },
             */
            ],
            label: 'Gym',
        },
        {
            Durations: [
                /*     {
                    startDate: new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000),
                    endDate: new Date(new Date().getTime() + 100000 + new Date().getTimezoneOffset() * 60000),
                    active: false,
                    id: 2,
                },
                {
                    startDate: new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000),
                    endDate: new Date(new Date().getTime() + 100000 + new Date().getTimezoneOffset() * 60000),
                    active: false,
                    id: 3,
                },
             */
            ],
            label: 'School',
        },
    ],
    lastid: 4,
};

interface Action {
    type: string;
    payload: UserData;
}

const dataReducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case 'SET_DATA':
            let setData = action.payload;
            return setData;
        default:
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

export const store = createStore(combineReducers({ UserData: dataReducer, Timer: timerReducer }));
