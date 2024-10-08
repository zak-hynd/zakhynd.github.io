export const powerPlans = [ //an array of objects
    {    name: 'Electric Kiwi MoveMaster',
        fixedRatePerDay: 1.43,
        defaultUsageRate: 0.1723,
        tieredRates: [
        { name: 'Day Rate',
            rate: 0.2413,
            start: '07:00',
            end: '23:00',
            days: [1,2,3,4,5,6,7] //everyday
        }, {
            name: 'Peak Morning',
            rate: 0.3446,
            start: '07:00',
            end: '09:00',
            days: [1,2,3,4,5] //weekdays
        }, {
            name: 'Peak Evening',
            rate: 0.3446,
            start: '17:00',
            end: '21:00',
            days: [1,2,3,4,5]
        },{
            name:'Hour of Power',
            rate: 0.0,
            start: '21:00',
            end: '22:00',
            days: [1,2,3,4,5,6,7]
        }]
    },
    {name: 'second power plan'},
    {name: 'third power plan'}
]//end of power plans


//schema?
//could have a url

const powerPlan = {
    name: "Custom Plan",       // Name of the plan
    fixedRatePerDay: 1.35,     // Fixed daily cost
    defaultUsageRate: 0.2988,  // Default usage rate for any times not specified
    
    tieredRates: [             // Array of rates with time and day ranges
        {
            name: "Morning Rate",
            rate: 0.1725,           // Rate in $/kWh
            start: "07:00",         // Start time
            end: "09:00",           // End time
            days: [1, 2, 3, 4, 5],  // Days of the week (1=Monday, 7=Sunday)
        },
        {
            name: "Day Rate",
            rate: 0.2225,
            start: "09:00",
            end: "21:00",
            days: [1, 2, 3, 4, 5],  // Weekdays
        },
        {
            name: "Night Rate",
            rate: 0.2500,
            start: "21:00",
            end: "06:00",           // Rolls over to the next day
            days: [1, 2, 3, 4, 5],  // Weekdays
        },
        {
            name: "Weekend Rate",
            rate: 0.2750,
            start: "00:00",
            end: "23:59",
            days: [6, 7],           // Applies all day on weekends (Saturday, Sunday)
        },
        {
            name: "Free Hour",
            rate: 0.0,              // Free power during this time
            start: "21:00",
            end: "22:00",
            days: [1, 2, 3, 4, 5],  // Applies on weekdays
        }
    ]
};