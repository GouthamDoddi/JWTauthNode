const { credentials } = require('./connectDB');
const { Client } = require('pg');

// lets create an async func that will get us the list of current users
async function getUsersList () {
    const client = new Client(credentials);

    const response = await client.query('SELECT * FROM nodeapp.user');

    return response;
}

module.exports = getUsersList;
