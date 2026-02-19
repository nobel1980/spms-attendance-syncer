//
// Description: This file contains the functions to login and send data to the api.
//
require('dotenv').config()
const axios = require('axios');

const authUrl = process.env.AUTHURL;
const apiUrl = process.env.APIURL;

// login
// Description: This function logs in to the api and returns the token.
// Input: None
const login = async () => {
    try {
        let resp = await axios.post(`${authUrl}/login`, {
            "username":"superadmin",
            "password":"pass123"
        });
        return resp.data.auth_token;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// sendData
// Description: This function sends the data to the api.
// Input: token, data
const sendData = async (token, data) => {
    try {
        let resp = await axios.post(`${apiUrl}/transaction/onSyncAttendance`, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return resp;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = {
    login,
    sendData,
}
