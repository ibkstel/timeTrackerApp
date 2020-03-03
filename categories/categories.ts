
interface subcategory{
    subname:string
    subcolor:string,
    subicon:string,
}

const transportationSubLabel: Array<subcategory> = [

    {
        subname:"Car",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Train",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Bus",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Airplane",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Tramway",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Other",
        subcolor:"blue",
        subicon: "home",
    },
    
]; 



const socialSubLabel: Array<subcategory> = [

    {
        subname:"Family",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Friend",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Coworker",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Relatives",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Other",
        subcolor:"blue",
        subicon: "home",
    },
]; 

const schoolSubLabel: Array<subcategory> = [

    {
        subname:"Lesson",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Homework",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Quiz",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Exam",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Study",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Other",
        subcolor:"blue",
        subicon: "home",
    },
]; 

const gymSubLabel: Array<subcategory> = [

    {
        subname:"Fitness",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Yoga",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Pilates",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Swimming",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Basketball",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Football",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Volleyball",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Running",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Walking",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Cycling",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Tennis",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Golf",
        subcolor:"blue",
        subicon: "home",
    },
]; 

const shoppingSubLabel: Array<subcategory> = [

    {
        subname:"Market",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Grocery",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Shopping Center",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Mall",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Tramway",
        subcolor:"blue",
        subicon: "home",
    },
]; 

const activitySubLabel: Array<subcategory> = [

    {
        subname:"Reading",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Drawing",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Music",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"TV & Film",
        subcolor:"blue",
        subicon: "home",
    },
    {
        subname:"Other",
        subcolor:"blue",
        subicon: "home",
    },
]; 

export interface category {
    name: string;
    labelColor: string;
    sublabel: Array<subcategory>;
    icon: string;
}

export const categories: Array<category> = [
    {
        name: 'Transportation',
        sublabel:transportationSubLabel,
        labelColor:"",
        icon: 'directions-bus',
    },
    {
        name: 'Activity',
        sublabel:activitySubLabel,
        labelColor:"",
        icon: 'directions-bus',
    },
    {
        name: 'Social',
        sublabel:socialSubLabel,
        labelColor:"",
        icon: 'people-outline',
    },
    {
        name: 'Gym',
        sublabel:gymSubLabel,
        labelColor:"",
        icon: 'fitness-center',
    },
    {
        name: 'School',
        sublabel:schoolSubLabel,
        labelColor:"",
        icon: 'school',
    },
    {
        name: 'Shopping',
        sublabel:shoppingSubLabel,
        labelColor:"",
        icon: 'shop',
    },
];

