export interface UserData {
    Data: Array<Data>;
    lastid: number;
}

export interface Data {
    Durations: Array<Dates>;
    label: string;
}

export interface Dates {
    startDate: Date;
    endDate: Date;
    id: number;
    active: boolean;
}
