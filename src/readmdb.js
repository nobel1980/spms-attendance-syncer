//
// Description: This file contains the functions to read the mdb file.
//
const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:/Users/mmmas/Downloads/att2000.mdb;');

// readData
// Description: This function reads the data from the mdb file.
// Input: fromDatetime, toDatetime
const readData = async (fromDatetime, toDatetime) => {    
    try {
        let query = `
            SELECT 
                USERINFO.BADGENUMBER, 
                USERINFO.USERID, 
                MIN(CHECKINOUT.CHECKTIME) AS FIRSTTOUCHIN, 
                MAX(CHECKINOUT.CHECKTIME) AS LASTTOUCHIN
            FROM 
                USERINFO 
            INNER JOIN 
                CHECKINOUT ON CHECKINOUT.USERID=USERINFO.USERID
            WHERE
                CHECKINOUT.CHECKTIME BETWEEN #${fromDatetime}# AND #${toDatetime}#                
            GROUP BY USERINFO.USERID, USERINFO.BADGENUMBER
        `;
        const result = await connection.query(query);
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    readData
}