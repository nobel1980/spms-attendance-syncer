require('dotenv').config()
const api = require('./src/api');
const readmdb = require('./src/readmdb');
const utils = require('./src/utils');

const main = async () => {
    const token = await api.login();
    if (token !== null) {
        // get current datetime and convert it to dateToString
        const datestring = utils.dateToString(new Date());
        // read the sync time from the file
        const fromDatetime = utils.readSyncTime();
        // calculate the toDatetime
        const toDatetime = utils.getTodayEndDatetime();
        // read the data from the mdb file
        const data = readmdb.readData(fromDatetime, toDatetime);
        // if any data found then send the data to the api
        if (data.length > 0) {
            const response = await api.sendData(token, data);
            console.log(response);
            // if the data is sent successfully then write the sync time to the file
            if (response.status === 200) {
                utils.writeSyncTime(datestring);
            }
        }
    }
}

main();