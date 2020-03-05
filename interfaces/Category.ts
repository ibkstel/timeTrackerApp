export interface Category {
    name: string;
    labelColor: string;
    sublabel: Array<SubCategory>;
    icon: string;
}

export interface SubCategory {
    subname: string;
    subcolor: string;
    subicon: string;
}
