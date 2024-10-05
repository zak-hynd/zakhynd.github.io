//parse the incoming csv file and melt it
document.getElementById('csvFileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        Papa.parse(file, {
            header: true,  // treat the first row as a header row. Q?:but what if we get a file that doesn't have a header? or has multiple header rows? reject?
            complete: function(parsedFile) {
                const data = parsedFile.data;  // parsed CSV data as an array of objects, where each object represents a row in the CSV file (except the header values, they're now keys in each object)
                const meltedData = meltCSVData(data);
                displayUsageStats(meltedData); //call to display...
                // console.log(`meltedData: ${meltedData}`);  // View the reshaped data in the console
                // console.log(meltedData[0,1,2])
            }
        });
    }
});

// Function to melt the CSV data (flatten it; turn it from wideform into longform)
function meltCSVData(data) {
    const melted = [];
    
    // Find the column index for the "date" (fuzzy match).. with the ElectricKiwi file, it should be the 4th column
    const headers = Object.keys(data[0]); //gets the keys (the original file's headers) from the first object (second row from the original file)  
    const dateColumn = headers.find(header => header.toLowerCase().includes('date')); //gets the position of the first header that has the word 'date'
    if (!dateColumn) { //if there's no date column...
        console.error('Date column not found!');
        return []; //...ragequit
    }

    // Loop through each row in the CSV
    data.forEach(row => {
        const date = row[dateColumn];

        // Iterate over each time column (excluding irrelevant columns)
        headers.forEach(header => {
            if (isTimeInterval(header) && row[header] != 0) { // remove zeros & checks if this is a time interval
                melted.push({ // slap this object into the array called 'melted'
                    date: date,
                    time: getIntervalMidpoint(header),
                    usage: parseFloat(row[header])
                });
            }
        });
    });
    return melted;
}//end of meltCSVData()

// check if a column header represents a time interval
function isTimeInterval(header) {
    // vv regular expression that assumes all time interval columns are in the format "X:XXam-XX:XXam" or "X:XXpm-XX:XXpm"
    return /\d{1,2}:\d{2}(am|pm)-\d{1,2}:\d{2}(am|pm)/i.test(header)
}

// converts the 30min time interval into the 15minute midpoint
function getIntervalMidpoint (header){
    //assumes intervals are always 30min increments in the format "X:XXam-XX:XXam" with inital minutes at 01 or 31
    const startTime = header.split(' - ')[0]; //get the first part of the time interval
    const isPM = startTime.includes('pm'); //true if its after midday

    // const am = header.split('-')[0].includes('a') //true if am, false if pm
    const minutes = parseInt(startTime.split(':')[1].substring(0, 2)) +14 //add 14 to minutes (assuming minutes always either 01 or 31)
    let hour = parseInt(startTime.split(':')[0]) //get hours from startTime as an integer

    if (isPM && hour !== 12) hour += 12;  // convert PM hours except 12pm
    if (!isPM && hour === 12) hour = 0;   // convert 12am to 00
    
    // ensure hours are always two digits
    const hourStr = hour.toString().padStart(2, '0');
       
    return hourStr + ':' + minutes //and nicely return in the format HH:MM
}//end getIntervalMidpoint()



import { sortUserPlugins } from 'vite';
//------------------
// do the calcs (separate file?)

//supposedly required to import these?
import { powerPlans } from './power-plans.js';
// Use the plans in calculations
// const selectedPlan = powerPlans.find(plan => plan.name === "Electric Kiwi - MoveMaster");

// <div id="csvStats"></div> //html file for reference
// document.getElementById("csvStats") = 'class="bordered-panel"'
document.getElementById("csvStats").innerHTML = `<p><b>Total usage:</b> ___ kWh</p>`


//calculate basic stats on imported data
// Assuming usageData is an array of objects like:
// { date: '2023-09-01', time: '12:00', usage: 0.25 }
function calculateTotalUsage(data) {
    // return data.reduce((total, record) => total + record.usage, 0); //I don't understand this yet
    let totalUsage = 0
    data.forEach(element => {
        totalUsage += element.usage
        // console.log(totalUsage)
    });
    // console.log(data[data.length-1]) //figure out why the last row has a NaN usage!
    return totalUsage;
}


function getUniqueDateArray(data){ //should I really be throwing the whole object at everything?
    const uniqueDates = new Set();
    data.forEach(record => {
        if (record.date) {
            uniqueDates.add(record.date);
        }
    });
    //sort array
    uniqueDates.sort((a, b) => new Date(a.date) - new Date(b.date));
    return uniqueDates;
}
console.log(getUniqueDateArray(['2023-09-22','2018-12-01','2018-12-01','2023-09-22']))

function calculateDays(data){
    //send data to unique dates function
    return uniqueDates.size;
}
function getDateRange (data){
    //send data to the unique dates function    
    return ;
}

function displayUsageStats(usageData) {
    //triggered by csv-parse part of code
    let totalUsage = calculateTotalUsage(usageData);
    let numDays = calculateDays(usageData)


    document.getElementById("csvStats").innerHTML = `<p>
        <b>Time period:</b> ${startDate} - ${endDate}
        <br><b>Days:</b> ${numDays}
        <br><b>Total usage:</b> ${totalUsage} kWh
        </p>`
}