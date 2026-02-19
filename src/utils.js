//
// Description: This file contains the utility functions for the application.
//
var fs = require('fs'); 

// dateToString
// Description: This function converts the date to string in the format yyyy-mm-dd hh:mm:ss AM/PM.
// Input: Date object
function dateToString(inputDate) {
    try {
        let date, month, year, hour, minute, second, ampm;
      
        date = inputDate.getDate();
        month = inputDate.getMonth() + 1;
        year = inputDate.getFullYear();
        hour = inputDate.getHours();
        minute = inputDate.getMinutes();
        second = inputDate.getSeconds();
        ampm = hour >= 12 ? 'PM' : 'AM';
      
        date = date
            .toString()
            .padStart(2, '0');
      
        month = month
            .toString()
            .padStart(2, '0');
      
        return `${year}-${month}-${date} ${hour}:${minute}:${second} ${ampm}`;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// getTodayEndDatetime
// Description: This function returns the end datetime of the current day.
// Input: None
const getTodayEndDatetime = () => {
    try{
        var date = new Date();
        date.setHours(23,59,59,999);
        return dateToString(date);
    }catch(err){
        console.log(err);
        return null;
    }
}

// readSyncTime
// Description: This function reads the sync time from the file.
// Input: None
const readSyncTime = async () => {
    try{
        var datestring = "";
        if (!fs.existsSync('datestring.txt')) {
            datestring = dateToString(new Date());
            if (datestring == null) {
                return null;
            }
            await writeSyncTime(datestring)
        } else {
            datestring = fs.readFileSync('datestring.txt', 'utf8');
        }
        console.log(datestring);
        return datestring;
    }catch(err){
        console.log(err);
        return null;
    }
}

// writeSyncTime
// Description: This function writes the sync time to the file.
// Input: Datestring
const writeSyncTime = async (datestring) => {
    return new Promise((resolve, reject) => {
        if (datestring == null) {
            reject(new Error("Datestring is null"));
        }    
        fs.writeFile("datestring.txt", datestring, function(err) {
            if(err) {
                console.log(err);
                reject(new Error("Error writing to file"));
            } else {
                console.log(`The file was saved with sync time ${datestring}!`);
                resolve(datestring);
            }
        });
    });
}

module.exports = {
    dateToString,
    readSyncTime,
    writeSyncTime,
    getTodayEndDatetime,
}